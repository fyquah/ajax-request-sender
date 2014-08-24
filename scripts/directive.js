app.directive("focusMe" , function(){
	return {
		restrict: "A",
		link: function(scope , element , attrs){
			console.log(element);
		}
	}
})