const moodleClient = require("./Client");
var moodle_client = require("moodle-client");
const config = require("../../config");

exports.get = function(credentials,id,callback){
    moodleClient.prepare(credentials,(client)=>{
      if(client!=null){
      client.call({
          wsfunction: "core_course_get_contents",
          args:{
            courseid : id
          }
      }).then(function(info) {
        allAcitvities = {};
        for (var dateInd = 1;dateInd<info.length;dateInd++){
          allModules = [];
          var modules = info[dateInd].modules;
          var date = info[dateInd].name;
          for (var moduleInd =0 ;moduleInd<modules.length;moduleInd++){
            module = modules[moduleInd];
            var name = module.name;
            var url = module.url;
            var desc = module.description;
            var files = [];
            var type = module.modname;
            var icon = module.modicon;
            contents = module.contents;
            if(typeof(contents)!="undefined")
            for (var contentInd=0;contentInd<contents.length;contentInd++){
              content = contents[contentInd];
              files.push({
                name: content.filename,
                url : content.fileurl
              })
            }
            allModules.push({icon:icon,name,name,type:type,url:url,desc:desc,files:files});
          }
          allAcitvities[date] = allModules;
        }
        callback(false,allAcitvities);
    })
  }
    else{
      callback(true,strings.badCredentials);
    }
    })
}
