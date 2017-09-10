var moodle_client = require("moodle-client");
const config = require("../../config");
const cache = require("memory-cache");


exports.prepare= function(credentials,clientCallback){
  var cachedClient=cache.get("Moodle:"+credentials.reg+credentials.password);
  if(cachedClient==null){
    console.log("Moodle Miss");
    moodle_client.init({
      wwwroot: config.moodleBaseUrl,
      username: credentials.reg,
      password: credentials.password
    }).then((client)=>{
      cache.put("Moodle:"+credentials.reg+credentials.password,client,config.validity*60*1000);
      clientCallback(client);
    }).catch(function(err) {
        console.log(err);
        clientCallback(null);
    });
  }
  else{
    console.log("Moodle Hit");
    cache.put("Moodle:"+credentials.reg+credentials.password,cachedClient,config.validity*60*1000);
    clientCallback(cachedClient);
  }
}
