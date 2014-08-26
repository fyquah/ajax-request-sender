app.controller("senderCtrl" , function($http , $scope, $requestService , outputMessage , Message){
  $scope.possibleRequestTypes = $requestService.possibleRequestTypes;
  $scope.styleOptions = {
    indentWidth : 20
  };

  $scope.initializeVariables = function(){
    $scope.requestParameters = [];
    $scope.requestHeaders = [];
    $scope.messages = [];
    $scope.errors = [];
  }

  $scope.addRequestParams = function(){
    $scope.requestParameters.push({
      key: "key",
      value: "your value"
    })
  }

  $scope.removeRequestParams = function(index){
    $scope.requestParameters.splice(index , 1);
  }

  $scope.submit = function(){
    var requestObj = {
      requestUrl: $scope.requestUrl,
      requestType: $scope.requestType,
      requestParameters: $requestService.compileParametersArray($scope.requestParameters)
    };
    console.log(requestObj);
    $scope.errors = $requestService.validateRequest(requestObj);
    if($scope.errors.length === 0){
      outputMessage($scope.messages , "sending a " + requestObj.requestType.toUpperCase() + " request to " + requestObj.requestUrl , 0);
      outputMessage($scope.messages , "your request parameters are: " , 0);
      outputMessage($scope.messages , requestObj.requestParameters , 0);
      
      var savePromise = $requestService.submitRequest(requestObj);
      savePromise.success = function(data){

      };
      savePromise.error = function(data){

      };
    }
  }
});
