"use strict";
const unirest= require('unirest');
const config = require('../../config')
const TimeTableParser = require('./TimeTableScrapper');
const CourseParser = require('./CourseScrapper');
const async = require('async');
const cheerio = require('cheerio');
const strings = require('../../strings');

exports.get= function(app, req, callback){

const onResponse=function(response){
    if(response.error) callback(true,strings.serverDown)
    else{
      const $= cheerio.load(response.body);
      var len = $('table').length;
      if(len==0){
        callback(true,strings.sessionExpired);
      }
      else{
      const asyncTasks = {
        courses : function(asyncCallback){
          CourseParser.scrape(app,$('tbody').eq(1).html(),asyncCallback);
        },
        timeTable : function(asyncCallback){
          TimeTableParser.scrape(app,$('tbody').eq(len-1).html(),asyncCallback);
        }
      };
      //SCRAPE TIMETABLE AND COURSES PARALLELY
      async.parallel(asyncTasks,(err,results)=>{
        if(err) callback(true,strings.serverError );
        else{
          callback(false,results);
        }
      });
    }
  }
};

  const token = req.token;
  const reg= req.regno;
  if(typeof(token)!="undefined" && typeof(reg)!='undefined'){
  const CookieJar= unirest.jar();
  CookieJar.add(unirest.cookie(token),config.TimeTableHref);
  CookieJar.add(unirest.cookie(reg),config.TimeTableHref);
  unirest.get(config.TimeTableHref)
  .jar(CookieJar)
  .end(onResponse);}
  else callback(true,strings.invalidParameter);
};
