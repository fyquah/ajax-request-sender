app.factory("Message" , function(){
	function Message(content , depth){
    this.content = content || "ahhh, dummy message";
    this.depth = depth || 0;
  };

	Message.prototype.style = function(options){
    if(options){
      return {
        "margin-left": (this.depth * options.indentWidth + "px")
      };  
    } else {
      return {};
    }
	}

  Message.prototype.toString = function(){
    return this.content;
  }

	return Message;
});

app.factory("outputMessage" , function(Message){
	return function (scope , obj , depth){
		depth = depth || 0;
    var terminating_types = ["string" , "number" , "array" , "function"];

    if(terminating_types.include(typeof obj)){
      scope.push(new Message(obj , depth));
      return;
    }

    Object.keys(obj).forEach(function(key , index){
      scope.push(new Message(key + " =>" , depth));
      outputMessages(scope , obj[key] , depth + 1);
    });
  };
});