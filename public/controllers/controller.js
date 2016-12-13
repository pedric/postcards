var postcardApp = angular.module('postcardApp', []);
postcardApp.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("Hello from appCtrl");

	// Sortoptions to filter
	$scope.sortOption = 'date'; // Sort by date by default

	var refresh = function() {
		$http.get('/postcards').success(function(response) {
			console.log("refresh() got the req data");
			$scope.postcards = response;
			//*$scope.postcard = "";
		});
	};

	refresh();

	$scope.addPostcard = function() {
		console.log($scope.postcard);
		$scope.postcard.date = new Date();
		$scope.postcard.key = $scope.postcard.key.toLowerCase().replace(/\s+/g, "");
		$http.post('/postcards', $scope.postcard).success(function(response) {
			console.log(response._id);
			$scope.shareUrl = "http://localhost:3000/mailbox/?id=" + response._id;
			
			var element = document.getElementById("toggle-container");
			element.innerHTML = '<p>Share this link with your loved ones!</p><p><a href="' + $scope.shareUrl + '">' + $scope.shareUrl + '</a></p>';
			//element.classList.add("fixed-fullscreen");
			//refresh();
		});
	};

	$scope.remove = function(id) {
		console.log(id);

		$http.delete('/postcards/' + id).success(function(response) {
			refresh();
		});
	};

	$scope.edit = function(id) {
		console.log(id);
		$http.get('/postcards/' + id).success(function(response) {
			$scope.postcard = response;
		});
	};

	$scope.update = function() {
		console.log($scope.postcard._id);
		$http.put('/postcards/' + $scope.postcard._id, $scope.postcard).success(function(response) {
			refresh();
		});
	};

	$scope.deselect = function() {
		$scope.contact = "";
	};

}]);