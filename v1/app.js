var express = require('express');
//const request = require('supertest');
var app = express();

app.get("/", (req, res, next) => {
  res.status(200).json({
    app: "backend-weather-app"
  });
});

//TESTS
// request(app)
//   .get('/')
//   .expect('Content-Type', /json/)
//   .expect(200)
//   .end(function(err, res) {
//     if (err) throw err;
//   });

module.exports = app;
