"use strict";
const unirest=require('unirest');
const config = require('../../config');
const strings =require('../../strings');
const cache = require('memory-cache');
const cheerio = require('cheerio');

exports.submit=function(app,data,callback){
  const url= config.loginSubmitAction;
  const CookieJar = unirest.jar();
  const AuthCookie=data.AuthCookie;

  const getMessage= function(body){
    const $ = cheerio.load(body);
    const message = $("input[name='message']").val();
    console.log(message);
    return message;
  };

  CookieJar.add(unirest.cookie(AuthCookie),url);
  const onPageLoaded=function(response){
    const after = Date.now();
    console.log("Page Loaded in : "+(after-before).toString()+"ms");
    try{
      if(response.request.uri.href!=config.homeHref){
        console.log(response.request.uri.href);
        var message = getMessage(response.body);
        if(message=='Invalid Register No. or Password.')
          callback(true,strings.badCredentials);
        else {
          callback(true,strings.retry);
        }
      }
      else{
        const onHomeLoad= function(response){
          const afterHomeLoad = Date.now();
          console.log("Home Loaded in : "+(afterHomeLoad-beforeHomeLoad).toString()+"ms");
          var cookieSplit = response.request.headers.cookie.split(";");
          cache.put(data.reg+data.password,response.request.headers.cookie,config.validity*1000*60);
          callback(false,{token: cookieSplit[0], regno: cookieSplit[1].trim()});
        }
        const beforeHomeLoad = Date.now();
        unirest.get("https://academicscc.vit.ac.in/student/stud_home.asp")
        .jar(CookieJar)
        .end(onHomeLoad);
    }
  }
  catch(e){
    console.log(e.message);
    callback(true,strings.serverError)
  }
  };

  const before = Date.now();
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
