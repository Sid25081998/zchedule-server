"use strict";
const express = require('express');
const config = require('./config');
const Error = require('./Classes/Error');
const strings = require('./strings');
require('@risingstack/trace');


const app=express();
const route = require("./routes")(app);
const port= config.port;

app.use(function(req,res){
  res.status(404).send('<html><head>'+strings.wrongRoute+'</head></html>');
});

app.listen(port);

console.log("Server has started at "+port);
