const strings = require("../../strings");
const unirest = require("unirest");
const cheerio = require("cheerio");
const cheerioTableparser = require('cheerio-tableparser');
const ScheduleEntry = require("../../Classes/ExamSchedule");
const config = require("../../config");

exports.get = function(data,callback){

  var onLoad = function(data){
    schedule = [];

    const codes = data[4];
    const names = data[5];
    const slots = data[6];
    const status = data[8];
    const venue = data[9];
    const seats = data[10];
    const dates = data[11];
    const times = data[12];
    const days = data[13];

    for (var i=1;i<codes.length;i++){
      var entry = new ScheduleEntry(codes[i],names[i],venue[i]+" "+seats[i],times[i],dates[i],status[i],slots[i],days[i]);
      schedule.push(entry);
    }
    callback(false,schedule);
  }

  const url = config.examScheduleHref;
  const CookieJar = unirest.jar();
  CookieJar.add(unirest.cookie(data.token),url);
  CookieJar.add(unirest.cookie(data.regno),url);
  unirest.get(url)
  .jar(CookieJar)
  .end((response)=>{
    if(!response.error){
      const $ = cheerio.load(response.body);
      const table = cheerio.load("<table>"+$("table").eq(1).html()+"</table>");
      cheerioTableparser(table);
      var schedule = table("table").parsetable(true, true, true);
      onLoad(schedule);
    }
    else{
      callback(true,strings.serverError);
    }
  });
}
