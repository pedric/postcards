var viewApp = angular.module('viewApp', []);
viewApp.controller('viewCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("Hello from viewCtrl");

	/* Get id from url */
	function getId(param){
	   if(param = (new RegExp('[?&]'+encodeURIComponent(param)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(param[1]);
	}
		
	var id = getId('id');


	var view = function(id) {
		$http.get('/postcards/' + id).success(function(response) {
			console.log(response);
			$scope.postcard = response;
		});
	};

	view(id);


	$scope.remove = function(id) {
		console.log(id);

		$http.delete('/postcards/' + id).success(function(response) {
			refresh();
		});
	};

}]);