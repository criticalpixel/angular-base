app.controller('appController', ['$http', 'foo', function($http,foo){
	var self = this;
	self.formData = {};

	$http.get('/api/todos')
		.success(function(data){
			self.todos = data;
			console.log(data);
		})
		.error(function(data){
			console.log('Error: ' + data);
		});

	//When form sumbitted, post to api
	self.createTodo = function(){
		$http.post('/api/todos', self.formData)
			.success(function(data){
				self.formData = {}; // clear the form for user
				self.todos =  data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	//delete a todo after checking it
	self.deleteTodo =  function(id){
		$http.delete('/api/todos' + id)
			.success(function(data){
				self.todos =  data;
				console.log(data);
			})
			.error(function(data){
				console.log('Error: ' + data);
			});
	};

	console.log(foo);
}]);
