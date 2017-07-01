const unirest = require('unirest');
const config = require('../../config');
const strings = require('../../strings');
const summaryScrapper = require("./SummaryScrapper");

exports.get= function(app,data,callback){
  const onLoad =function(response){
    summaryScrapper.get(response.body,(err,message)=>{
      callback(err,message);
    });
  };
  const CookieJar = unirest.jar();

  const token = data.token;
  const reg = data.regno;
  if(typeof(token)!="undefined" && typeof(reg)!="undefined"){
    var semStart = config.semStart;
    var semEnd = config.semEnd;
    var url= config.attendanceHref+'&fmdt='+semStart+'&todt='+semEnd;
    CookieJar.add(unirest.cookie(token),url);
    CookieJar.add(unirest.cookie(reg),url);
    unirest.post(url)
    .jar(CookieJar)
    .end(onLoad);
  }
  else callback(true,strings.invalidParameter);

}
