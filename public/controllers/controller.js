var myApp = angular.module('myApp', []);
myApp.controller('appCtrl', ['$scope', '$http', function($scope, $http) {
	console.log("Hello from controller my app");

	var refresh = function() {
		$http.get('/postcards').success(function(response) {
			console.log("igot the req data");
			$scope.postcards = response;
			$scope.contact = "";
		});
	};

	refresh();

	$scope.addContact = function() {
		console.log($scope.contact);
		$http.post('/postcards', $scope.contact).success(function(response) {
			console.log(response);
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
			$scope.contact = response;
		});
	};

	$scope.update = function() {
		console.log($scope.contact._id);
		$http.put('/postcards/' + $scope.contact._id, $scope.contact).success(function(response) {
			refresh();
		});
	};

	$scope.deselect = function() {
		$scope.contact = "";
	};


}]);