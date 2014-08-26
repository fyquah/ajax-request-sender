app.service("$requestService" , ["outputMessage" , "$http" , function(outputMessage , $http){
  var self = this;
  
  // Privilleged methods
  self.validateRequest = function(obj){
    var errors = [];
    // validates that request type is one of the given types
    ["requestType" , "requestUrl"].forEach(function(prop){
      if(obj[prop] === "" || obj[prop] === null || typeof obj[prop] === "undefined"){
        errors.push("Please provide a value for " + prop);
      }
    });
    if(!self.possibleRequestTypes.include(obj.requestType)){
      errors.push("invalid request type given");
    }
    
    return errors;
  }

  self.compileParametersArray = function(arr){
    var obj = {};
    arr.forEach(function(x){
      obj[x.key] = x.value;
    });
    return obj;
  }

  self.possibleRequestTypes = ["get" , "post" , "delete" , "put" , "patch" , "head" , "jsonp"];

  self.submitRequest = function(obj){
    var savePromise = null;
    if(obj.requestType == "put" || obj.requestType == "patch" || obj.requestType == "post"){
      savePromise = $http[obj.requestType](obj.requestUrl , obj.requestParameters);
    } else { 
      // Need to use query strings for the following methods
      if(Object.keys(obj.requestParameters).length != 0){
        url += "?";
        Object.keys(obj.requestParameters).forEach(function(key , index){
          if(index != 0)
            url += "&";
          url += key + "=" + obj.requestParameters[key];
        });
      }
      savePromise = $http[obj.requestType](obj.requestUrl);
    }
    return savePromise;
  };
}]);