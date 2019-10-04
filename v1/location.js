var express = require("express");
var axios = require('axios');
const request = require('supertest');
var app = express();


app.get("/location", (req, res) => {
  url = `${process.env.URL_ID_API}?fields=status,message,countryCode,regionName,country`
  axios.get(url).then(response => {
    return res.status(200).json({location: response.data,});
  }).catch(error => {
    return res.status(500).json({message: "Error in location",error});
  })
});
//TEST
request(app).get('/location').expect('Content-Type', /json/).expect(200).end(function(err, res) {
  if (err) throw err;
});

module.exports = app;
