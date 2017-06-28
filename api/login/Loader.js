"use strict"
const unirest = require('unirest');
const CaptchaParser = require('./CaptchaParser');
const Submitter=require('./Submitter');
const config=require("../../config");
const strings = require('../../strings');
const cache = require('memory-cache');

const captchaUri = config.captchaUri;

exports.get= function(app,data,callback){
  const onRequest= function(response){
    if(response.error) callback(true,strings.vitDown);
    else{
      const sessionIdKey = Object.keys(response.cookies)[0];
      const sessionCookie = sessionIdKey+"="+response.cookies[sessionIdKey];
      const captchaWord=CaptchaParser.parse(response.body);
      const dataToSubmit=
      {
        reg : data.reg,
        password: data.password,
        AuthCookie: sessionCookie,
        captcha: captchaWord
      }
      Submitter.submit(app,dataToSubmit,(err,message)=>{
        callback(err,message);
      });
    }
  };

  if(data!=null){
  const regno = data.reg;
  const password = data.password;
  if(typeof(regno)=='undefined' || typeof(password)=='undefined'){
    callback(true,strings.invalidParameter);
  }
  else{
    var cookie=cache.get(regno+password);
    if(cookie==null){
      console.log("cache : miss");
      unirest.get(captchaUri)
          .encoding(null)
          .timeout(26000)
          .end(onRequest);
        }
    else{
      console.log("cache : hit");
      var cookieSplit = cookie.split(";");
      cache.put(data.reg+data.password,cookie,config.validity*1000*60);
      callback(false,{token: cookieSplit[0], regno: cookieSplit[1].trim()});
    }
  }
}
else{
  callback(true,strings.invalidSyntax);
}

}
