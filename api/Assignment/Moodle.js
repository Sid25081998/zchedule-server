var moodle_client = require("moodle-client");
const config = require("../../config");
const strings = require("../../strings");
exports.getAssignments = function(credentials,callback){
  moodle_client.init({
    wwwroot: config.moodleBaseUrl,
    username: credentials.reg,
    password: credentials.password

}).then(function(client) {
    client.call({
        wsfunction: "mod_assign_get_assignments",
    }).then(function(info) {
      courses = info.courses;
      assignments = {};
      for (courseIndex in courses){
        name = courses[courseIndex].shortname;
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
        assignments[name]=allAssignments;
      }
      callback(false,assignments);
    });

}).catch(function(err) {
    console.log(err);
    callback(true,strings.moodleError);
});
}
