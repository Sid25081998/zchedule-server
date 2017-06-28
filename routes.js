const login = require('./api/login/Loader');
const timetable = require('./api/TimeTable/Loader');
const attendance = require('./api/Attendance/Loader');
const Error = require("./Classes/Error");
const headerParser = require("./api/login/HeadParser");
const strings = require("./strings");

module.exports= function(app){
  //TODO document param(regno,password)  method: post url: /login
  app.post('/login',(req,res)=>{
    var credentials = headerParser.parse(req.headers);
    login.get(app,credentials,(err,data)=>{
      if(err){
        console.log(data);
        res.json((new Error(data)));
      }
      else{
        res.json(data);
      }
    });
  });

//TODO document param(token,regno)  method: post url: /timetable
  app.post('/timetable',(req,res)=>{
    var credentials = headerParser.parse(req.headers);
    login.get(app,credentials,(err,data)=>{
      if(err) res.json(new Error(data));
      else{
        timetable.get(app,data,(err,data)=>{
          if(err) res.json(new Error(data));
          else res.json(data);
        });
      }
    });
  });

  //TODO document param(token,regno)  method: post url: /attendance
  app.post('/attendance',(req,res)=>{
    var credentials = headerParser.parse(req.headers);
    login.get(app,credentials,(err,data)=>{
      if(err) res.json(new Error(data));
      else{
        attendance.get(app,data,(err,data)=>{
          if(err) res.json(new Error(data));
          else{
            res.send(data);
          }
        });
      }
  });
});

  //TODO document param(regno,password)  method: post url: /all
  app.post('/all',(req,res)=>{
    var credentials = headerParser.parse(req.headers);
      login.get(app,credentials,(err,data)=>{
        if(err) res.json(new Error(data));
        else{
          timetable.get(app,data,(err,data)=>{
            if(err) res.json(new Error(data));
            else res.json(data);
          });
        }
      });
  });
};
