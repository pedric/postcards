var postcardApp = angular.module('postcardApp', []);
postcardApp.controller('appCtrl', ['$scope', '$http', function($scope, $http) {

	// Sortoptions to filter
	$scope.sortOption = 'date'; // Sort by date by default


	$scope.refresh = function() {
		$http.get('/postcards').success(function(response) {

			$scope.postcards = response;
		});
	};

	$scope.refresh();

	$scope.unset = function() {
		$scope.postcard = "";
	};

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
			$("#send-button-wrapper").animate({ height: "38px" }, 200 );
			$("#send-postcard").animate({ display: "block",opacity: 1 }, 200 );
		} else {
			$("#send-button-wrapper").animate({ height: "0px" }, 200 );
			$("#send-postcard").animate({ opacity: 0, display: "none" }, 200 );
		}
	}

	$scope.addPostcard = function() {
		
		if ($scope.postcardForm.$valid) {
			
			if($scope.postcard.private && $scope.postcard.hint.length > 0 && $scope.postcard.key.length > 0 || !$scope.postcard.private) {
				
				$scope.postcard.date = new Date();
				$scope.postcard.key = $scope.postcard.key.toLowerCase().replace(/\s+/g, "");
				$http.post('/postcards', $scope.postcard).success(function(response) {
					
					$scope.shareUrl = "http://localhost:3000/mailbox.html?id=" + response._id;
					
					$("#main-app-container").animate({ opacity: 0 }, 100, function() {

						var element = '<div id="share-link"><p>Share this link with your loved ones!</p><p><a href="' + 
						$scope.shareUrl + '">' + $scope.shareUrl + 
						'</a></p><p onclick="closeSharelink()">Send more postcards!</p></div>';
						$("#toggle-container").prepend(element);

						$("#main-app-container").animate({ opacity: 1 }, 100);
					});

					$scope.refresh();
					$scope.unset();
					
				});

			} else {

				$("#err-msg").html("<div><p>Private postcards require a question and answer.</p></div>");
				$("#err-msg div").animate({ opacity: 1 }, 200);
					setTimeout(function() { 
					$("#err-msg div").animate({ opacity: 0 }, 750, function() {
						$("#err-msg").html("");
					});
				}, 1500);
			}

		} else {

			$("#err-msg").html("<div><p>This postcard is not complete.</p></div>");
			$("#err-msg div").animate({ opacity: 1 }, 200);
				setTimeout(function() { 
				$("#err-msg div").animate({ opacity: 0 }, 750, function() {
					$("#err-msg").html("");
				});
			}, 1500);
		}
	};

	$scope.hideShowHintfield = function($element) {

		if ($scope.postcard.private) {
			$("#hintfield").animate({ height: "106px" }, 200);
			$(".label-body").css( "color", "#000" );
		} else {
			$("#hintfield").animate({ height: "0px" }, 200);
			$(".label-body").css( "color", "#ababab" );
		}
		
	};

	$scope.addSearchResults = function() {

		if ($scope.searchResults < Object.keys($scope.postcards).length) {
			$scope.searchResults += 24;
			if ($scope.searchResults > Object.keys($scope.postcards).length) {
				$scope.showmore = "That's all :)";	
			}
		} else {
			$scope.showmore = "That's all :)";
		}
	}

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