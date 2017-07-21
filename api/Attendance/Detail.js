const cheerio = require("cheerio");
const cheerioTableparser = require("cheerio-tableparser");
const AttEntry = require("../../Classes/AttendanceEntry");

exports.get = function(code,type,data,callback){
  try{
    const page = cheerio.load(data.body);
    const allTables = page("table");
    const noOftables = allTables.length;
    console.log(code+" "+noOftables.toString());
    if(noOftables==3){
      const $ = cheerio.load("<table>"+ allTables.eq(2).html()+"</table>");
      cheerioTableparser($);
      var attData = $("table").parsetable(true, true, true);
      var dates = attData[1];
      var statuses = attData[3];
      var result =[];
      for (var i=2;i<dates.length;i++){
        result.push(new AttEntry(dates[i],statuses[i]));
      }
      callback(false,{code:code, type:type, attArray:result});
    }
    else{
      callback(false,{code:code, type:type, attArray:[]});
    }
  }
  catch(e){
    callback(false,{code:code, type:type, attArray:[]});
  }
}
