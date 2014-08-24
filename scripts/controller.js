app.controller("senderCtrl" , function($http , $scope){
	$scope.possibleRequestTypes = ["get" , "post" , "delete" , "put" , "patch" , "head" , "jsonp"];
	$scope.indentWidth = 20;

	function Message(content , depth){
		this.content = content || "ahhh, dummy message";
		this.depth = depth || 0;
	}

	Message.prototype.width_style = function(){
		return {"margin-left": (this.depth * $scope.indentWidth + "px")};
	}

	function outputMessages(obj , depth){
		var terminating_types = ["string" , "number" , "array" , "function"];

		if(terminating_types.indexOf((typeof obj).toLowerCase()) != -1){
			$scope.messages.push(new Message(obj , depth));
			return;
		}
		Object.keys(obj).forEach(function(key , index){
			$scope.messages.push(new Message(key + " =>" , depth));
			outputMessages(obj[key] , depth + 1);
		});
	}


	function submissionParameters(){
		var return_obj = Object.create(null);
		$scope.requestParameters.forEach(function(param , index){
			return_obj[param.key] = param.value;
		});
		return return_obj;
	}

	$scope.initializeVariables = function(){
		$scope.requestParameters = [];
		$scope.requestHeaders = [];
		$scope.messages = [];	}

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
		var parameters = submissionParameters(); 
		var url = $scope.requestUrl;

		$scope.messages.push(new Message("Creating a request of the type " + $scope.requestType , 0));
		$scope.messages.push(new Message("Your parameters are " + $scope.requestType , 0));
		outputMessages(parameters, 0);
		return;
		console.log(submissionParameters());
		console.log($scope.requestType);

		var savePromise = null;
		if($scope.requestType == "put" || $scope.requestType == "patch" || $scope.requestType == "post"){
			savePromise = $http[$scope.requestType](url , parameters);
		} else { // Non-data-sensitive methods
			if(Object.keys(parameters).length != 0){
				url += "?";
				Object.keys(parameters).forEach(function(key , index){
					if(index != 0)
						url += "&";
					url += key + "=" + parameters[key];
				});
			}
			savePromise = $http[$scope.requestType](url);
		}
		savePromise.success = function(data){
			$scope.results = data;
		}
		savePromise.error = function(data){
			$scope.results = data;
		}
	}
});
