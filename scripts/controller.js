app.controller("senderCtrl" , function($http , $scope, $requestService){
  $scope.possibleRequestTypes = $requestService.possibleRequestTypes;
  $scope.indentWidth = 20;

  $scope.initializeVariables = function(){
    $scope.requestParameters = [];
    $scope.requestHeaders = [];
    $scope.messages = []; }

  $scope.addRequestParams = function(){
    $scope.requestParameters.push({
      key: "",
      value: ""
    })
  }

  $scope.removeRequestParams = function(index){
    $scope.requestParameters.splice(index , 1);
  }

  $scope.submit = function(){
    var requestObj = {
      requestUrl: $scope.requestUrl,
      requestType: $scope.requestType,
      requestParameters: $scope.requestParameters
    };
    $scope.errors = $requestService.validate(requestObj);
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
