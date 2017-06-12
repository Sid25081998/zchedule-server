const login = require('./api/login/Loader');
const timetable = require('./api/TimeTable/Loader');
const Error = require("./Classes/Error");

module.exports= function(app){
  app.post('/login',(req,res)=>{
    //onlogin
    login.get(app,req,(err,data)=>{
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
    timetable.get(app,req,(err,message)=>{
      if(err) res.json((new Error(message)));
      else{
        res.json(message);
      }
    });
  });
};
