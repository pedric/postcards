var postcardApp = angular.module('postcardApp', []);
postcardApp.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("Hello from appCtrl");

	var refresh = function() {
		$http.get('/postcards').success(function(response) {
			console.log("refresh() got the req data");
			$scope.postcards = response;
			$scope.postcard = "";
		});
	};

	refresh();

	$scope.addPostcard = function() {
		console.log($scope.postcard);
		$http.post('/postcards', $scope.postcard).success(function(response) {
			console.log(response._id);
			$scope.shareUrl = "http://localhost:3000/mailbox/?id=" + response._id;
			refresh();
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