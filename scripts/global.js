// Override the console.log functon 
console.olog = console.log;
// Some initializations are done here
var app = angular.module("app" , []);

Array.prototype.include = function(term){
	for(var i = 0 ; i < this.length ; i++)
		if(this[i] === term)
			return true;
		
	return false;
}