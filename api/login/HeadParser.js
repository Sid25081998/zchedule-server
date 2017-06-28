"use strict"
exports.parse = function(header){
  try{
  var params = header.authorization.split(" ")[1].split(":");
  return {
    reg : params[0],
    password : params[1],
  }
}
catch(e){
  return null;
}
}
