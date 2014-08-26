// Override the console.log functon 
console.olog = console.log;
// Some initializations are done here
var app = angular.module("app" , []);

Array.prototype.include = function(term){
	this.forEach(function(item){
		if(item === term)
			return true;
	});
	return false;
}