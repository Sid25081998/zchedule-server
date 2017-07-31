'use strict';

module.exports = function(message){
  this.message=message;
  this.error=true;
  this.get= function(){
    return JSON.stringify(this);
  };
}
