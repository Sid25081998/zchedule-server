"use strict"
const cheerio = require("cheerio");
const config = require("../../config");
const detail = require("./Detail");
const async = require("async");
const unirest = require("unirest");
const strings = require("../../strings");

exports.get= function(data,creds,callback){
  const url = config.attendanceSubmitHref;
  var page = cheerio.load(data);
  var tableInstance = page("table");
  var noOftables = tableInstance.length;
  var $ = cheerio.load("<table>"+ tableInstance.eq(noOftables-1).html()+"</table>");
  var semCode = $("input[name='semcode']").eq(0).val();
  var classnbrs = $("input[name='classnbr']");
  var fromDate  = $("input[name='from_date']").eq(0).val();
  var toDate = $("input[name='to_date']").eq(0).val();
  var crscds = $("input[name='crscd']");
  var crstps = $("input[name='crstp']");
  var length = crscds.length;


  var CookieJar = unirest.jar()
  CookieJar.add(unirest.cookie(creds.token),url);
  CookieJar.add(unirest.cookie(creds.regno),url);

  var courseDetails = [];
  for (var index =0;index<length;index++){
    var number = classnbrs.eq(index).val(),
    code = crscds.eq(index).val(),
    type = crstps.eq(index).val();
    var courseDetail = {
      semcode : semCode,
      classnbr : number,
      crscd : code,
      crstp : type,
      from_date : fromDate,
      to_date : toDate
    }
    courseDetails.push(courseDetail);
}

  const onDetails = function(course,asyncCallback){
    unirest.post(url)
    .jar(CookieJar)
    .form(course)
    .timeout(20*1000)
    .end((response)=>{
      detail.get(course.crscd,course.crstp,response,asyncCallback);
    });
  };

  async.map(courseDetails,onDetails,(err,response)=>{
    callback(false,response);
  });
}
