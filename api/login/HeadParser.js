"use strict"
exports.parse = function(header){
  try{
  var params = JSON.parse(header.authorization);
  return {
    reg : params.userName,
    password : params.password,
  }
}
catch(e){
  return null;
}
}
