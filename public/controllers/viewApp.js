var viewApp = angular.module('viewApp', []);
viewApp.controller('viewCtrl', ['$scope', '$http', function($scope, $http) {

	$scope.unlocked = true;

	/* Get id from url */
	function getId(param){
	   if(param = (new RegExp('[?&]'+encodeURIComponent(param)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(param[1]);
	}

	var id = getId('id');

	if (id == null) { window.location.replace("index.html"); }

	var publicOrPrivate = function() {

		if(!$scope.postcard.private) {
			$scope.unlocked = false;
			$scope.msg = $scope.postcard.greeting;
			$scope.img = $scope.postcard.image;
			$("#confirm").css( "opacity", 0 );
		} else {
			$scope.unlocked = true;
		}
	};

	var setView = function(id) {

		$http.get('/postcards/' + id).success(function(response) {

			if (!response) {
				window.location.replace("index.html");
			}

			$scope.postcard = response;
			publicOrPrivate();
		});
	};

	setView(id);

	var showContent = function() {
		$scope.unlocked = false;
		$scope.msg = $scope.postcard.greeting;
		$scope.img = $scope.postcard.image;
	};

	$scope.report = function() {
		$http.put('/postcards/' + $scope.postcard._id).success(function(response){
			$scope.reported = true;
		});
	};

	$scope.unlock = function() {

		var escapedUserAnswer = $scope.userAnswer.toLowerCase().replace(/\s+/g, "");

		if(escapedUserAnswer === $scope.postcard.key) {
			$("#confirm").animate({ "opacity": 0 }, 300 );
			$scope.unlocked = false;
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