"use strict";
const express = require('express');
const config= require('./config');

const app=express();
const route = require("./routes")(app);
const port= config.port;
app.listen(port);

console.log("Server has started at "+port);
