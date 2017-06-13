const login = require('./api/login/Loader');
const timetable = require('./api/TimeTable/Loader');
const Error = require("./Classes/Error");

module.exports= function(app){
  //TODO document param(regno,password)  method: post url: /login
  app.post('/login',(req,res)=>{
    //onlogin
    login.get(app,{reg: req.query.regno, password: req.query.password},(err,data)=>{
      if(err){
        console.log(data);
        res.json((new Error(data)));
      }
      else{
        console.log(data);
        res.json(data);
      }
    });
  });

  app.post('/timetable',(req,res)=>{
    //TODO document param(token,regno)  method: post url: /timetable
    timetable.get(app,{token: req.query.token, regno: req.query.regno},(err,message)=>{
      if(err) res.json((new Error(message)));
      else{
        res.send(message);
      }
    });
  });
};
