app.service("$requestService" , ["$scope", "outputMessage", "Message" , "$http" , function($scope , outputMessage , Message , $http){
  var self = this;
    
  // Private methods
  function requestObject(){
    return {
      requestUrl: $scope.requestUrl ,
      requestParameters: submissionParameters(),
      requestType: $scope.requestType
    }
  }

  function submissionParameters = function(){
    var return_obj = Object.create(null);
    $scope.requestParameters.forEach(function(param , index){
      return_obj[param.key] = param.value;
    });
    return return_obj;
  }

  function validateRequest(obj){
    var errors = [];
    // validates that request type is one of the given types
    ["requestType" , "requestUrl"].forEach(function(prop){
      if(obj[prop] === "" || obj[prop] === null || typeof obj[prop] === "undefined"){
        errors.push("Please provide a value for " + prop);
      }
    });
    if(possibleRequestTypes.include(obj.requestType) === false){
      errors.push("invalid request type given");
    }
    
    return errors;
  }
  // Privilleged methods
  self.possibleRequestTypes = ["get" , "post" , "delete" , "put" , "patch" , "head" , "jsonp"];

  self.submitRequest = function(){
    var obj = requestObject();
    var $scope.errors = validateRequest(obj);
    if($scope.errors.length !== 0){
      return;
    } else {
      outputMessage("Creating a request of type " + requestType , 0);
      outputMessage("Your parameters are ");
      outputMessage(obj.requestParameters);

      var savePromise = null;
      if(requestType == "put" || requestType == "patch" || requestType == "post"){
        savePromise = $http[obj.requestType](url , parameters);
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
        savePromise = $http[requestType](url);
      }
      savePromise.success = function(data){
        outputMessages(data , 0);
      }
      savePromise.error = function(data){
        outputMessages(data , 0);
      }
 
    }
  };
}]);