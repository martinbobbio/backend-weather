var express = require("express");
var bodyParser = require("body-parser");

var app = express();

var env = require('node-env-file');
env(__dirname + '/.env');

app.use(function(req, res, next){
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  res.header("Access-Control-Allow-Methods", "POST, GET, PUT, DELETE, OPTIONS")
  next();
});

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

var appRoute = require("./v1/app");
var locationRoute = require("./v1/location");
var currentRoute = require("./v1/current");
var forecastRoute = require("./v1/forecast");

app.use("/", appRoute);
app.use("/v1", locationRoute);
app.use("/v1", currentRoute);
app.use("/v1", forecastRoute);

const port = process.env.PORT || 5000
app.listen(port, () => console.log(`Express server puerto ${port}: \x1b[32m%s\x1b[0m`, "online"));
