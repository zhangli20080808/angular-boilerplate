(function (angular) {
	'use strict';

//创建正在热映的模块
var module = angular.module(
	'moviecat.movie_detail', [
	 'ngRoute',
	 'moviecat.services.http'
	 ])
//配置模块的路由  总路由里面只配置了一个otherwise  然后配置了自身的路由 好处？模块自己管理自己 更方便
module.config(['$routeProvider', function($routeProvider) {
	// 当我们的路径是/in_theaters 的时候 他就会去找下面的view.html 和InTheaterController控制器
	// 接着去处理控制起的逻辑
  $routeProvider.when('/detail/:id', {
    templateUrl: 'movie_detail/view.html', 
    controller: 'MovieDetailController'
  });
}])

module.controller('MovieDetailController', [
	'$scope',
	'$route',
	'$routeParams',
	'HttpService',
	function($scope,$route,$routeParams,HttpService) {
 		$scope.movie = {};
 		var id = $routeParams.id;

 		var apiAddress = 'http://api.douban.com/v2/movie/subject/'+id;

 		//跨域的方式
 		HttpService.jsonp(apiAddress,{},function (data) {
 			//判断一下，如何data 是一个function的话，我们就让callback =data  ,如果别人没
 			//传data  第二个参数就是一个回调函数   如果是个function 那么第三个参数就没有传过来 
 			$scope.movie = data;
 			$scope.$apply();
 		})

 	
		
  
}]);
})(angular) 

//控制器的编写分为两部
		//1.设计爆路的数据   2.设计爆喽的行为  
		//这里有个api的概念  应用程序编程接口  所有有输入和输出的东西都是api 说白了  都是函数
		// $scope.subjects = data;
		// var doubanApiAdress = 'http://api.douban.com/v2/movie/in_theaters';
		// angular中将所有的jsonp的callback都挂在到angular.callback这个对象上  污染全局 
		// 为什么会有jsonp呢 就是因为XMLHTTPRequest 他不支持跨域请求  script img 支持 
		//iframe   再angular使用jsonp的方式做跨域请求，就必须给当前的地址啊上一个参数callback=JSON_CALLBACK
		// 会将这样一个字符串替换成一个随机的函数名，相当于一个站位符
		// $http.jsonp(doubanApiAdress＋'?callback=JSON_CALLBACK').then(function (res) {
		// 	if (res.status == 200) {
		// 		$scope.subjects = res.data.subjects;
		// 	}else{
		// 		$scope.msg = '获取数据错误:'+res.statusText;
		// 	}	  
		// },function (err) {
		// 	console.log(err);
		// 	$scope.msg = '获取数据错误:'+err.statusText;
		// })
