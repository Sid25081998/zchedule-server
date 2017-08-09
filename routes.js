const login = require('./api/login/Loader');
const timetable = require('./api/TimeTable/Loader');
const attendance = require('./api/Attendance/Loader');
const assignments = require("./api/Assignment/Loader");
const Error = require("./Classes/Error");
const headerParser = require("./api/login/HeadParser");
const strings = require("./strings");
const async = require("async");
const moodle = require("./api/Assignment/Moodle");

module.exports= function(app){
  //TODO document param(regno,password)  method: post url: /login
  app.post('/login',(req,res)=>{
    var before= Date.now();
    var credentials = headerParser.parse(req.headers);
    login.get(app,credentials,(err,data)=>{
      if(err){
        console.log(data);
        res.json((new Error(data)));
      }
      else{
        res.json(data);
      }
      var after = Date.now();
      console.log("Response Time :login "+(after-before).toString());
    });
  });

//TODO document param(token,regno)  method: post url: /timetable
  app.post('/timetable',(req,res)=>{
    var before= Date.now();
    var credentials = headerParser.parse(req.headers);
    login.get(app,credentials,(err,data)=>{
      if(err) res.json(new Error(data));
      else{
        timetable.get(app,data,(err,data)=>{
          if(err) res.json(new Error(data));
          else res.json(data);

          var after = Date.now();
          console.log("Response Time :timetable "+(after-before).toString());
        });
      }
    });
  });

  //TODO document param(token,regno)  method: post url: /attendance
  app.post('/attendance',(req,res)=>{
    var before= Date.now();
    var credentials = headerParser.parse(req.headers);
    login.get(app,credentials,(err,data)=>{
      if(err) res.json(new Error(data));
      else{
        attendance.get(app,data,false,(err,data)=>{
          if(err) res.json(new Error(data));
          else{
            res.json(data);
          }
          var after = Date.now();
          console.log("Response Time :attendance "+(after-before).toString());
        });
      }
  });
});

  //TODO document param(regno,password)  method: post url: /all
  app.post('/all',(req,res)=>{
    var before= Date.now();
    var credentials = headerParser.parse(req.headers);
      login.get(app,credentials,(err,data)=>{
        if(err) res.json(new Error(data));
        else{

          var asyncTasks = {
            timeTable : function(asyncCallback){
              timetable.get(app,data,asyncCallback)
            },
            attendance : function(asyncCallback){
              attendance.get(app,data,true,asyncCallback);
            }
          };
          async.parallel(asyncTasks,(err,results)=>{
            if(err) {
              console.log(results);
              res.json(new Error(strings.serverError));
            }
            else{
              res.json({"attendanceSummary" : results.attendance, "courses" : results.timeTable.courses, "timeTable": results.timeTable.timeTable });
            }

            var after = Date.now();
            console.log("Response Time :all : "+(after-before).toString());
          });

        }
      });
  });


  //TODO document param(regno,password)  method: post url: /assignments
  app.post("/assignments",(req,res)=>{
    var before= Date.now();
    var credentials = headerParser.parse(req.headers);
    login.get(app,credentials,(err,data)=>{
      if(err) res.json(new Error(data));
      else{
        assignments.get(app,data,(err,result)=>{
          if(err) res.json(new Error(result));
          else{
            res.json(result);
          }
          var after = Date.now();
          console.log("Response Time :attendance "+(after-before).toString());
        });
      }
    });
  });

  app.post("/moodle",(req,res)=>{
    var before= Date.now();
    var credentials = headerParser.parse(req.headers);
      moodle.getAssignments(credentials,(err,message)=>{
        if(err)res.json(new Error(message));
        else{
          res.json(message);
        }
        var after = Date.now();
        console.log("Response Time :Moodle Assignments "+(after-before).toString());
      });
  });
};
