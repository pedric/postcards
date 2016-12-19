/**********************************************************/
// Author: Fredrik Larsson | epost.larsson@gmail.com
/**********************************************************/

// Init Angular app 'viewApp' & controller 'viewCtrl'
var viewApp = angular.module('viewApp', []);
viewApp.controller('viewCtrl', ['$scope', '$http', function($scope, $http) {

	// Init ngShow var for "locked" postcards
	$scope.unlocked = true;

	/* Get id from url param */
	function getId(param){
	   if(param = (new RegExp('[?&]'+encodeURIComponent(param)+'=([^&]*)')).exec(location.search))
	      return decodeURIComponent(param[1]);
	}
	var id = getId('id');
	// Redirect to index if no id-param is sent
	if (id == null) { window.location.replace("index.html"); }

	// Function to decide if postcards is public or requires a hint->answer
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

	// Get postcard from id param
	var setView = function(id) {

		$http.get('/postcards/' + id).success(function(response) {
			if (!response) {
				window.location.replace("index.html");
			}
			$scope.postcard = response;
			publicOrPrivate();
		});
	};

	// Postcard init
	setView(id);

	// Get "real" content from GET req to UI vars
	var showContent = function() {
		$scope.unlocked = false;
		$scope.msg = $scope.postcard.greeting;
		$scope.img = $scope.postcard.image;
	};

	// Validate answer and show content if correct
	$scope.unlock = function() {

		var escapedUserAnswer = $scope.userAnswer.toLowerCase().replace(/\s+/g, "");

		if(escapedUserAnswer === $scope.postcard.key) {
			$("#confirm").animate({ "opacity": 0 }, 300 );
			$scope.unlocked = false;
			$scope.msg = $scope.postcard.greeting;
			$scope.img = $scope.postcard.image;
		}
	};

	/* For further development of admin UI / Report functionality */
	/*
	$scope.report = function() {
		$http.put('/postcards/' + $scope.postcard._id).success(function(response){
			$scope.reported = true;
		});
	};

	$scope.remove = function(id) {
		console.log(id);

		$http.delete('/postcards/' + id).success(function(response) {
			refresh();
		});
	};
	*/
}]);