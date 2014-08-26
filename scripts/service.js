app.service("$spinner" , ["$rootScope" , function($rootScope){
  this.stop = function(){
    $rootScope.spinnerIsMoving = false;
  };

  this.start = function(){
    $rootScope.spinnerIsMoving = true;
  };
}]);


app.service("$requestService" , ["outputMessage" , "$http" , function(outputMessage , $http){
  var self = this;
  
  // Privilleged methods  
  self.nonParameterRequest = ["get" , "delete"];
  self.possibleRequestTypes = ["get" , "post" , "delete" , "put" , "patch" , "head" , "jsonp"];

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

  self.tidyUpRequest = function(obj){
    if(self.nonParameterRequest.include(obj.requestType)){
      if(Object.keys(obj.requestParameters).length != 0){
        obj.requestUrl += "?";
        Object.keys(obj.requestParameters).forEach(function(key , index){
          if(index != 0){
            obj.requestUrl += "&";
          }
          obj.requestUrl += (key + "=" + obj.requestParameters[key]);
        });
      }
      obj.requestParameters = {}; // points to an empty object
    }
    return obj;
  }

  self.submitRequest = function(obj){
    var savePromise = null;
    if(obj.requestType == "put" || obj.requestType == "patch" || obj.requestType == "post"){
      savePromise = $http[obj.requestType](obj.requestUrl , obj.requestParameters);
    } else { 
      savePromise = $http[obj.requestType](obj.requestUrl);
    }
    console.log(savePromise);
    return savePromise;
  };
}]);