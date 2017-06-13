"use strict";
const unirest= require('unirest');
const config = require('../../config')
const TimeTableParser = require('./TimeTableScrapper');
const CourseParser = require('./CourseScrapper');
const async = require('async');
const cheerio = require('cheerio');

exports.get= function(app, req, callback){

const onResponse=function(response){
    if(response.error) callback(true,"Server Not ready")
    else{
      const $= cheerio.load(response.body);
      var len = $('table').length;
      if(len==0){
        callback(true,'Session Expired');
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
        if(err){callback(true,results.courses || results.timeTable)}
        else{
          callback(false,results);
        }
      });
    }
  }
};

  const token = req.token;
  const reg= req.regno;
  const CookieJar= unirest.jar();
  CookieJar.add(unirest.cookie(token),config.TimeTableHref);
  CookieJar.add(unirest.cookie(reg),config.TimeTableHref);
  unirest.get(config.TimeTableHref)
  .jar(CookieJar)
  .end(onResponse);
};
