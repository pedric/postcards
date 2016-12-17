var viewApp = angular.module('viewApp', []);
viewApp.controller('viewCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("Hello from viewCtrl");

	$scope.unlocked = true;

	/* Get id from url */
	function getId(param){
	   if(param = (new RegExp('[?&]'+encodeURIComponent(param)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(param[1]);
	}

	var publicOrPrivate = function() {

		if(!$scope.postcard.private) {
			$scope.unlocked = true;
			$scope.msg = $scope.postcard.greeting;
			$scope.img = $scope.postcard.image;
			$("#confirm").animate({ "opacity": 0 }, 300 );
		} else {
			$scope.unlocked = false;
		}
	};

	var setView = function(id) {
		$http.get('/postcards/' + id).success(function(response) {

			$scope.postcard = response;

			publicOrPrivate();
		});
	};

	var id = getId('id');
	setView(id);

	var showContent = function() {
		$scope.unlocked = true;
		$scope.msg = $scope.postcard.greeting;
		$scope.img = $scope.postcard.image;
	};

	$scope.unlock = function() {

		var escapedUserAnswer = $scope.userAnswer.toLowerCase().replace(/\s+/g, "");

		if(escapedUserAnswer === $scope.postcard.key) {
			$("#confirm").animate({ "opacity": 0 }, 300 );
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