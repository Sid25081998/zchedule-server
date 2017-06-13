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
    var dayArray = [];
    for (var col = 1;col<timetableData.length-2;col++){
      const item = new Session(timetableData[col][0]/*theoryHour*/,timetableData[col][1]/*labHour*/,timetableData[col][row]/*cellContent*/);
      dayArray.push(item);
    }
    table.push(dayArray);
  }
  callback(false,table);
}
catch(e){
  console.log(e.message);
  callback(true,strings.sessionExpired);
  }
}
