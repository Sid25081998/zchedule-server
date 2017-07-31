"use strict";
const cheerio= require('cheerio');
const tableParser = require('cheerio-tableparser');
const Session = require('../../Classes/session.js');
const strings = require('../../strings');

exports.scrape = function(app,data,callback){
  const $=cheerio.load('<table>'+data+'</table>');
  tableParser($);
  var timetableData = $("table").parsetable(true, true, true);

try{
  var table = [];
  for (var row = 2; row<7;row++){
    var contentArray = [];
    for (var col = 1;col<timetableData.length-2;col++){
      contentArray.push(timetableData[col][row]/*cellContent*/);
    }
    table.push(contentArray);
  }
  var theoryHourArray = [];
  var labHourArray = [];
  for (var col=1;col<timetableData.length-2;col++){
    theoryHourArray.push(timetableData[col][0]); //theoryHour
    labHourArray.push(timetableData[col][1]); //labHour
  }
  callback(false,{ contentTable:table, theoryHours: theoryHourArray, labHours: labHourArray });
}
catch(e){
  console.log(e.message);
  callback(true,strings.sessionExpired);
  }
}
