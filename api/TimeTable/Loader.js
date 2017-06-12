"use strict";
const unirest= require('unirest');
const config = require('../../config')
exports.get= function(app, req, callback){

const onResponse=function(response){
    if(response.error) callback(true,"Server Not ready")
    else{
    callback(false,response)
  }
};
  const token = req.query.token;
  const reg= req.query.reg;
  const CookieJar= unirest.jar();
  CookieJar.add(unirest.cookie(token),config.TimeTableHref);
  CookieJar.add(unirest.cookie(reg),config.TimeTableHref);
  unirest.get(config.TimeTableHref)
  .jar(CookieJar)
  .end(onResponse);
};
