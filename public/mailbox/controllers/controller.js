var viewApp = angular.module('viewApp', []);
viewApp.controller('viewCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("Hello from viewCtrl");

	$scope.unlocked = true;

	/* Get id from url */
	function getId(param){
	   if(param = (new RegExp('[?&]'+encodeURIComponent(param)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(param[1]);
	}
		
	var id = getId('id');

	var publicOrPrivate = function() {

		if(!$scope.postcard.private) {
			$scope.unlocked = true;
			$scope.msg = $scope.postcard.greeting;
			$scope.img = $scope.postcard.image;
		} else {
			$scope.unlocked = false;
		}
	};

	var setView = function(id) {
		$http.get('/postcards/' + id).success(function(response) {
			console.log(response);
			$scope.postcard = response;

			publicOrPrivate();
		});
	};

	setView(id);

	$scope.unlock = function() {

		var escapedUserAnswer = $scope.userAnswer.toLowerCase().replace(/\s+/g, "");

		if(escapedUserAnswer === $scope.postcard.key) {
			$scope.unlocked = true;
			$scope.msg = $scope.postcard.greeting;
			$scope.img = $scope.postcard.image;
		}
	};

	$scope.remove = function(id) {
		console.log(id);

		$http.delete('/postcards/' + id).success(function(response) {
			refresh();
		});
	};

}]);