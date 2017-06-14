const unirest = require('unirest');
const config = require('../../config');
const strings = require('../../strings');

exports.get= function(app,data,callback){
  const onLoad =function(response){
    callback(true,"Attendance data not yet ready");
  };
  const CookieJar = unirest.jar();

  const token = data.token;
  const reg = data.regno;
  if(typeof(token)!="undefined" && typeof(reg)!="undefined"){
    CookieJar.add(unirest.cookie(data.token),config.attendanceHref);
    CookieJar.add(unirest.cookie(data.reg),config.attendanceHref);
    unirest.post(config.attendanceHref)
    .jar(CookieJar)
    .end(onLoad);
  }
  else callback(true,strings.invalidParameter);

}
