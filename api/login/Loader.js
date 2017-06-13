"use strict"
const unirest = require('unirest');
const CaptchaParser = require('./CaptchaParser');
const Submitter=require('./Submitter');
const config=require("../../config");
const strings = require('../../strings');

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

  const regno = data.reg;
  const password = data.password;
  if(typeof(regno)=='undefined' || typeof(password)=='undefined'){
    callback(true,strings.invalidParameter);
  }
  else{
  unirest.get(captchaUri)
      .encoding(null)
      .timeout(26000)
      .end(onRequest);
    }
}
