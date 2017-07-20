exports.get = function(code,data,callback){
  var key = code.toString();
  console.log(data.body);
  callback(false,{key  : data.body});
}
