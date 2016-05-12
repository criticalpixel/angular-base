//Application Controller
app.controller('appController', ['$http', 'foo', function($http,foo){
	var self = this;
	self.bar = foo;
}]);