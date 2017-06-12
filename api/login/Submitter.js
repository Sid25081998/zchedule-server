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
        const onHomeLoad= function(response){
          var cookieSplit = response.request.headers.cookie.split(";")
          callback(false,{token: cookieSplit[0], regno: cookieSplit[1].trim()});
        }
        console.log(response);
        unirest.get("https://academicscc.vit.ac.in/student/stud_home.asp")
        .jar(CookieJar)
        .end(onHomeLoad);
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
