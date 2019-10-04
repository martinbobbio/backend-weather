var express = require("express");
var axios = require('axios');
const request = require('supertest');
var app = express();

app.get("/forecast", (req, res) => {
  urlLocation = `${process.env.URL_ID_API}?fields=status,message,countryCode,regionName,country`
  axios.get(urlLocation).then(responseLocation => {
    var { regionName, countryCode } = responseLocation.data
    urlWeather = `${process.env.URL_BASE_FORECAST}?q=${regionName},${countryCode}&appid=${process.env.WEATHER_API_KEY}`
    axios.get(urlWeather).then(responseWeather => {
      return res.status(200).json({forecast: responseWeather.data,});
    }).catch(error => {
      return res.status(500).json({message: "Error in forecast weather",error});
    })
  }).catch(error => {
    return res.status(500).json({message: "Error in forecast location",error});
  })
});
//TEST
request(app).get('/forecast').expect('Content-Type', /json/).expect(200).end(function(err, res) {
  if (err) throw err;
});

app.get("/forecast/:city", (req, res) => {
  var city = req.params.city;
  urlWeather = `${process.env.URL_BASE_FORECAST}?q=${city}&appid=${process.env.WEATHER_API_KEY}`
    axios.get(urlWeather).then(responseWeather => {
      return res.status(200).json({forecast: responseWeather.data});
    }).catch(error => {
      return res.status(500).json({message: "Error in forecast weather city",error});
    })
});
//TEST
request(app).get('/forecast/Madrid').expect('Content-Type', /json/).expect(200).end(function(err, res) {
  if (err) throw err;
});

module.exports = app;
