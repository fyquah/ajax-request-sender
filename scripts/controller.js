app.controller("senderCtrl" , ["$http" , "$scope" , "$requestService" , function($http , $scope , $requestService){
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
    $requestService.submitRequest();
  }
}]);
