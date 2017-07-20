const unirest = require('unirest');
const config = require('../../config');
const strings = require('../../strings');
const summaryScrapper = require("./SummaryScrapper");
const cache = require("memory-cache");
const detailedScrapper = require("./DetailedScrapper");

exports.get= function(app,data,isSummary,callback){
  const onLoad =function(response){
    cache.put(data.token,response.body,2*60*1000);
    if(isSummary){
      summaryScrapper.get(response.body,(err,message)=>{
        callback(err,message);
      });
    }
    else{
      detailedScrapper.get(response.body,data,(err,message)=>{
        callback(err,message);
      });
    }
  };
  const CookieJar = unirest.jar();

  const token = data.token;
  const reg = data.regno;
  if(typeof(token)!="undefined" && typeof(reg)!="undefined"){
    var summaryResponse=cache.get(token);
    if(summaryResponse==null){
      console.log("TOken Erroe");
      var semStart = config.semStart;
      var semEnd = config.semEnd;
      var url= config.attendanceHref+'&fmdt='+semStart+'&todt='+semEnd;
      CookieJar.add(unirest.cookie(token),url);
      CookieJar.add(unirest.cookie(reg),url);
      unirest.post(url)
      .jar(CookieJar)
      .end(onLoad);
    }
    else{
      console.log("TOken no error");
      if(isSummary){
        summaryScrapper.get(summaryResponse,(err,message)=>{
          callback(err,message);
        });
      }
      else{
          detailedScrapper.get(summaryResponse,data,(err,message)=>{
            callback(err,message);
          });
      }
    }
  }
  else callback(true,strings.invalidParameter);
}
