(function (angular) {
	//由于默认angular提供的异步请求对象不支持自定义调用函数名
	//angular随机分配的回调函数名不被豆瓣支持
	var http = angular.module('moviecat.services.http', [])
	// dom操作
	http.service('HttpService', ['$document',function ($document) {

		// console.log($document);
		// http://api.douban.com/v2/movie/in_theaters  我们要放到script里面 
		// 如果前台传过来的时候就有？我们需要做一个判断 
		// html就可以自动执行了
		$(this).jsonp = function (url,callback) {

				// 3.挂载回调函数  挂载到全局了  我们采用这种方式
				// 
				
				cbFuncName = 'my_json_b_' + Math.random().toString().replace('.','');

				window[cbFuncName] = callback;



				// 0.将data转化为字符串的形式 
				// {id:1,name:'zhangsan'}  -->  id=1& name=zhangsan		
				
				//怎么转化呢  －->for in
				var querytring = url.indexOf('?')==-1 ? '?':'&';
				for(var key in data){
					querystring += key + '='+'data[key]'+'&'
					//       		id   =      1
					//querystring = ?id=1&zhangsan&
				}



			 	// 1.处理url中的回调参数
			 	// url += callback=随机de一个函数名gdsgsag

			 	
			 	querystring += 'cb='+cbFuncName
			 	//querystring = ?id=1$zhangsan&cb=my_json_b_124214141241
			 	// 2.创建一个script标签
			 	var scriptElement = document.createElement('script');
			 	scriptElement.src = url+querytring;
			 	//注意此时还不能append到页面上
			 	
			 	
			 	// 4.将script标签放入页面中
			 	document.body.appendChild(scriptElement);
			 	// append过后页面 会自动对这个地址发送一个请求，请求完成以后自动执行
			 	
		}
	}])
})(angular)