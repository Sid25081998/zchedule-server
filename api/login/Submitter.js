"use strict";
const unirest=require('unirest');
const config = require('../../config');
const strings =require('../../strings');
const cache = require('memory-cache');

exports.submit=function(app,data,callback){
  const url= config.loginSubmitAction;
  const CookieJar = unirest.jar();
  const AuthCookie=data.AuthCookie;
  CookieJar.add(unirest.cookie(AuthCookie),url);

  const onPageLoaded=function(response){
      if(response.request.uri.href!=config.homeHref){
        console.log(response.request.uri.href);
        console.log(response.body);
        callback(true,strings.badCredentials);
      }
      else{
        const onHomeLoad= function(response){
          var cookieSplit = response.request.headers.cookie.split(";");
          cache.put(data.reg+data.password,response.request.headers.cookie,config.validity*1000*60);
          callback(false,{token: cookieSplit[0], regno: cookieSplit[1].trim()});
        }
        unirest.get("https://academicscc.vit.ac.in/student/stud_home.asp")
        .jar(CookieJar)
        .end(onHomeLoad);
    }
  };

  unirest.post(url)
  .jar(CookieJar)
  .form({
    regno : data.reg,
    passwd : data.password,
    vrfcd : data.captcha
  })
  .timeout(28500)
  .end(onPageLoaded);
};
