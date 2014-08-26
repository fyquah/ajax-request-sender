app.controller("senderCtrl" , [
  "$spinner" , "$http" , "$scope" , "$requestService" , "outputMessage" , "Message",
  function($spinner , $http , $scope, $requestService , outputMessage , Message){
  $scope.possibleRequestTypes = $requestService.possibleRequestTypes;
  $scope.styleOptions = {
    indentWidth : 20
  };

  $scope.initializeVariables = function(){
    $scope.requestParameters = [];
    $scope.requestHeaders = [];
    $scope.messages = [];
    $scope.errors = [];
  };

  // Headers
  $scope.addRequestHeader = function(){
    $scope.requestHeaders.push({
      key: "",
      value: ""
    });
  };

  $scope.removeRequestHeader = function(index){
    $scope.requestHeaders.splice(index , 1);
  }

  // Params
  $scope.addRequestParam = function(){
    $scope.requestParameters.push({
      key: "",
      value: ""
    })
  };

  $scope.removeRequestParam = function(index){
    $scope.requestParameters.splice(index , 1);
  };

  $scope.submit = function(){
    var requestObj = {
      requestUrl: $scope.requestUrl,
      requestType: $scope.requestType,
      requestParameters: $requestService.compileParametersArray($scope.requestParameters),
      requestHeaders: $requestService.compileParametersArray($scope.requestHeaders)
    };
    console.log(requestObj);
    $scope.errors = $requestService.validateRequest(requestObj);
    if($scope.errors.length === 0){
      $spinner.start();
      $requestService.tidyUpRequest(requestObj);

      // output messages about the request
      outputMessage($scope.messages , requestObj.requestType.toUpperCase() + " " + requestObj.requestUrl , 0);
      if(Object.keys(requestObj.requestParameters).length !== 0){
        outputMessage($scope.messages , "parameters: " , 0);
        outputMessage($scope.messages , requestObj.requestParameters , 0);
      }
      outputMessage($scope.messages , "Headers which are not specified will be defaulted to common vales depending on nature of the request" , 0);
      if(Object.keys(requestObj.requestHeaders).length !== 0){
        outputMessage($scope.messages , "custom headers: " , 0);
        outputMessage($scope.messages , requestObj.requestHeaders , 0);
      }
      // finish outputing all the request-based messages

      var savePromise = $requestService.submitRequest(requestObj);
      function responseAction(data, status, headers, config){
        ["data" , "status" , "headers" , "config"].forEach(function(x){
          console.log(eval(x));
        });
        outputMessage($scope.messages, { "STATUS" : status } , 0);
        outputMessage($scope.messages, { "RESPONSE HEADERS": headers() } , 0);
        outputMessage($scope.messages, { "CONFIG" : config } , 0);
        outputMessage($scope.messages, { "DATA" : data } , 0);
        $spinner.stop();
      }
      savePromise.success(responseAction);
      savePromise.error(responseAction);
    }
  };
}]);
