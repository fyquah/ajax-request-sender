app.factory("Message" , function(){
	function Message(content , depth , nature){
    this.content = content || "ahhh, dummy message";
    this.depth = depth || 0;
  };

	Message.prototype.style = function(){
	  return {
	    "margin-left": (this.depth * $scope.indentWidth + "px")
	  };
	}

  Message.prototype.toString = function(){
    return this.content;
  }

	return Message;
});

app.factory("outputMessage" , function(){
	return function (obj , depth){
		depth = depth || 0;
    var terminating_types = ["string" , "number" , "array" , "function"];

    if(terminating_types.include(typeof obj)){
      $scope.messages.push(new Message(obj , depth));
      return;
    }

    Object.keys(obj).forEach(function(key , index){
      $scope.messages.push(new Message(key + " =>" , depth));
      outputMessages(obj[key] , depth + 1);
    });
  };
});