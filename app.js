// jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const rp = require("request-promise");

const app = express();
app.set('view engine', 'ejs');

app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static("public"));

let name;
let date;
let max_supply;
let circ_supply;
let total_supply;
let price;

app.get("/",function(req,res)
{
    res.render("list", ({bitName:name,bitDate:date,bitMaxSupply:max_supply,bitCircSupply:circ_supply,bitTotalSupply:total_supply,bitPrice:price}));
});

app.get("/data",function(req,res)
{
  const requestOptions = {
  method: 'GET',
  uri: 'https://pro-api.coinmarketcap.com/v1/cryptocurrency/listings/latest',
  qs: {
    'start': '1',
    'limit': '5000',
    'convert': 'USD'
  },
  headers: {
    'X-CMC_PRO_API_KEY': "dcbad8c7-d169-4326-b7e1-062ff10506c2"
  },
  json: true,
  gzip: true
};

rp(requestOptions).then(response =>
  {
  console.log('mydata=====>>>>>',response.data[0].name);
  name = response.data[0].name;
  date = response.data[0].date_added;
  max_supply = response.data[0].max_supply;
  circ_supply = response.data[0].circulating_supply;
  total_supply = response.data[0].total_supply;
   price = response.data[0].quote.USD.price;


  res.render("list",({bitName:name,bitDate:date,bitMaxSupply:max_supply,bitCircSupply:circ_supply,bitTotalSupply:total_supply,bitPrice:price}));

  // res.redirect("/");


}).catch((err) => {
  console.log('API call error:', err.message);
});


});



app.listen(3000, function()
{
  console.log("Server started at pot 3000");
});
