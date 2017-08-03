const unirest = require("unirest");
const config = require("../../config");
const strings = require("../../strings");

exports.get= function(app,data,callback){
  const CookieJar = unirest.jar();

  const token = data.token;
  const reg = data.regno;
  if(typeof(token)!="undefined" && typeof(reg)!="undefined"){
    const url = config.assignmentsHref;
    CookieJar.add(unirest.cookie(token),url);
    CookieJar.add(unirest.cookie(reg),url);
    unirest.post(url)
    .jar(CookieJar)
    .timeout(20000)
    .end((response)=>{
      if(response.error) callback(true,strings.vitDown);
      else{
        callback(false,response.body);
      }
    });
  }
}
