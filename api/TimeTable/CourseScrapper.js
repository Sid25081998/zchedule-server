"use strict"
const cheerio= require('cheerio');
const cheerioTableparser = require('cheerio-tableparser');
const Course = require('../../Classes/Course');

exports.scrape= function(app,data,callback){

const courseTable = cheerio.load('<table>'+data+'</table>');
cheerioTableparser(courseTable);
var CourseData = courseTable("table").parsetable(true, true, true);
try{
const slots = CourseData[9];
const code = CourseData[3];
const title = CourseData[4];
const type = CourseData[5];
const venues = CourseData[10];
const faculty = CourseData[11];
var courses= [];
for (var index=1;index<slots.length-2;index++){
  if(slots[index]!='NIL'){
    var newCourse = new Course(code[index],title[index],type[index],venues[index],faculty[index],slots[index]);
    courses.push(newCourse);
  }
}
callback(false,courses);
}
catch(e){
  console.log(e.message);
  callback(true,'Session expired');
}
}
