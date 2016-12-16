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

	// Checkbox and require fields
	$scope.formCheck = function() {
		if ($scope.postcardForm.$valid && !$scope.postcard.private) {
			$scope.hideButton = false;
		} else if ($scope.postcardForm.$valid && $scope.postcard.private && $scope.postcard.hint.length > 0 && $scope.postcard.key.length > 0) {
			$scope.hideButton = false;
		} else {
			$scope.hideButton = true;
		}

		if (!$scope.hideButton) {
			$("#send-postcard").animate({ display: "block",opacity: 1 }, 200 );
		} else {
			$("#send-postcard").animate({ opacity: 0, display: "none" }, 200 );
		}
	}

	$scope.addPostcard = function() {
		
		if ($scope.postcardForm.$valid) {
			
			if($scope.postcard.private && $scope.postcard.hint.length > 0 && $scope.postcard.key.length > 0 || !$scope.postcard.private) {
				
				$scope.postcard.date = new Date();
				$scope.postcard.key = $scope.postcard.key.toLowerCase().replace(/\s+/g, "");
				$http.post('/postcards', $scope.postcard).success(function(response) {
					
					$scope.shareUrl = "http://localhost:3000/mailbox/?id=" + response._id;
					
					var element = document.getElementById("toggle-container");
					element.innerHTML = '<p>Share this link with your loved ones!</p><p><a href="' + $scope.shareUrl + '">' + $scope.shareUrl + '</a></p>';
					
				});

			} else {
				var element = document.getElementById("err-msg");
				element.innerHTML = "<div><p>Private postcards requires a question and an answer..</p></div>";	
			}

		} else {
			var element = document.getElementById("err-msg");
			element.innerHTML = "<div><p>Oops, the postcard is not complete..</p></div>";
		}
	};

	$scope.hideShowHintfield = function($element) {

		if ($scope.postcard.private) {
			$("#hintfield").animate({ height: "106px" }, 200);
		} else {
			$("#hintfield").animate({ height: "0px" }, 200);
		}
		
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