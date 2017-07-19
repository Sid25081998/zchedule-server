"use strict"
const cheerio = require("cheerio");
const cheerioTableparser = require('cheerio-tableparser');
const attendanceContainer = require("../../Classes/CourseAttendance");
const strings = require("../../strings");

exports.get = function(data,callback){
  try{
  var $= cheerio.load(data);
  const allTableInstance = $('table');
  var tableLength = allTableInstance.length;
  var table = cheerio.load("<table>"+ allTableInstance.eq(tableLength-1).html()+"</table>");
  cheerioTableparser(table);
  var CourseData = table("table").parsetable(true, true, true);
  const codes = CourseData[1];
  const types = CourseData[3];
  const attendeds = CourseData[6];
  const totals = CourseData[7];
  const percentages = CourseData[8];

  var result=[];
  for (var i=1;i<codes.length;i++){
    result.push(new attendanceContainer(codes[i],types[i],attendeds[i],totals[i],percentages[i]));
  }
  callback(false,result);
}
catch(e){
  callback(true,strings.serverError);
}
}
