var core =  angular.module('core', []);

core.factory('foo', function(){
	return "HelloWorld";
});


// function loadModule(dir, name, type){
// 	var module = document.createElement('script');
// 	module.src = dir+name;
// 	if(type){
// 		module.type = type;
// 	}
// 	else{
// 		module.type = 'text/javascript';
// 	}
//     document.getElementsByTagName('body')[0].appendChild(module);
// }