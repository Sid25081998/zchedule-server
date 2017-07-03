exports.get = function(code,data,callback){
  var key = code.toString();
  callback(false,{key  : data.body});
}
