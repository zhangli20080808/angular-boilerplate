'use strict';

// Declare app level module which depends on views, and components
angular.module('moviecat', [
  'ngRoute',
  'moviecat.movie_detail',
  'moviecat.movie_list',
]).
config(['$routeProvider', function($routeProvider) {
  $routeProvider.otherwise({redirectTo: '/in_theaters/1'});
}])
.controller('NavController', [
	'$scope', 
	'$location',
	function ($scope,$location) {
		$scope.$location = $location;
		$scope.$watch('$location.path()', function(now) {
			// var path = $location.path();
		//startWith  一个字符串以什么开头吧
		if (now.startsWith('/in_theaters')) {
			$scope.type = 'in_theaters';
		}else if (now.startsWith('/coming_soon')) {
			$scope.type = 'coming_soon';
		}else if (now.startsWith('/top250')) {
			$scope.type = 'top250';
		}
		// console.log($location.path());
		//我们这个地方拿不到，因为他不属于哪个模块
		// console.log($scope.type);
		});
}])
.controller('SearchController', [
	'$scope', 
	'$route',
	function ($scope,$route) {
		$scope.input = '';//取文本框的输入
		$scope.search = function () {
			console.log($scope.input);
			$route.updateParams({category:'search',q:$scope.input})
		}
	
}])
;
