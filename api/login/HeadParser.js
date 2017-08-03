"use strict"
exports.parse = function(header){
  try{
  var params = JSON.parse(header.authorization);
  console.log("From "+params.userName);
  return {
    reg : params.userName,
    password : params.password,
  }
}
catch(e){
  return null;
}
}
