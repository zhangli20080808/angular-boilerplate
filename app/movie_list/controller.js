(function (angular) {
	'use strict';

//创建正在热映的模块
var module = angular.module(
	'moviecat.movie_list', [
	 'ngRoute',
	 'moviecat.services.http'
	 ])
//配置模块的路由  总路由里面只配置了一个otherwise  然后配置了自身的路由 好处？模块自己管理自己 更方便
module.config(['$routeProvider', function($routeProvider) {
	// 当我们的路径是/in_theaters 的时候 他就会去找下面的view.html 和InTheaterController控制器
	// 接着去处理控制起的逻辑
  $routeProvider.when('/:category/:page', {
    templateUrl: 'movie_list/view.html', 
    controller: 'MovieListController'
  });
}])

module.controller('MovieListController', [
	'$scope',
	'$route',
	'$routeParams',
	'HttpService',
	function($scope,$route,$routeParams,HttpService) {
 		

 		var count = 10;//每一页的条数
		var page = parseInt($routeParams.page);//当前第几页
		var start = (page-1)*count;//当前页从哪开始

 		$scope.loading = true;//开始加载
		$scope.subjects=[];
		$scope.title='loading...';
		$scope.message ='';
		$scope.totalCount = 0;//总的条数
		$scope.totalPages =0;//总页数
		$scope.currentPage = page;//当前页
		

		//$routeParams的来源 1.路由匹配出来的  2.？后面的参数 
		HttpService.jsonp('http://api.douban.com/v2/movie/'+$routeParams.category,{start:start,count:count,q:$routeParams.q},function (data) {

			
			// 一个对象
			// console.log(data);
			$scope.title = data.title;
			$scope.subjects = data.subjects;
			//我们渠道数据之后，没有同步到界面上   有可能会出现这个问题
			//$apply的作用就是让指定的表达式重新同步
			$scope.totalCount = data.total;
			//$apply会吧数据模型上的所有值都走一遍  所以不能放在他后面 我们这个地方的loading


			$scope.totalPages = Math.ceil($scope.totalCount/count);
			$scope.loading = false;

			$scope.$apply('subjects');
		})

		// 暴露一个上一页下一页的行为
	      $scope.go = function(page) {
	        // 传过来的是第几页我就跳第几页
	        // 一定要做一个合法范围校验
	        if (page >= 1 && page <= $scope.totalPages)
	          $route.updateParams({ page: page });
	      };
		
		
  
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
