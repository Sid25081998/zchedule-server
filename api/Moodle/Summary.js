const moodleClient = require("./Client");
var moodle_client = require("moodle-client");
const config = require("../../config");
const strings = require("../../strings");

exports.get = function(credentials,callback){
  moodleClient.prepare(credentials,(client)=>{
    if(client!=null){
    client.call({
        wsfunction: "mod_assign_get_assignments"
    }).then(function(info) {
      courses = info.courses;
      assignments = {};
      for (courseIndex in courses){
        if(courses[courseIndex].shortname.endsWith(config.moodleSemCode)){
          name = courses[courseIndex].fullname;
          id = courses[courseIndex].id;
          rawAssignments = courses[courseIndex].assignments
          allAssignments = []
          for (assignmentIndex in rawAssignments){
            assignment = rawAssignments[assignmentIndex];
            allAssignments.push({
              name:assignment.name,
              duedate:assignment.duedate,
              intro : assignment.intro,
              attachments : assignment.introattachments
            })
          }
          assignments[name]={ id : id,assignments:allAssignments};
        }
      }
      callback(false,assignments);
    });
  }
  else{
    callback(true,strings.badCredentials);
  }
  });
}
