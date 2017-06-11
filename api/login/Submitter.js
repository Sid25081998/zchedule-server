"use strict";
const unirest=require('unirest');
const config = require('../../config');

exports.submit=function(app,data,callback){
  const url= config.loginSubmitAction;
  const CookieJar = unirest.jar();
  const AuthCookie=data.AuthCookie;
  CookieJar.add(unirest.cookie(AuthCookie),url);
  console.log(AuthCookie);

  const onPageLoaded=function(response){
      if(response.request.uri.href!=config.homeHref){
        callback(true,"Bad credentials");
      }
      else{
        callback(false,response.request.headers.cookie);
    }
  };

  unirest.post(url)
  .jar(CookieJar)
  .form({
    regno: data.reg,
    passwd: data.password,
    vrfcd: data.captcha
  })
  .end(onPageLoaded);
};
