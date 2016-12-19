/**********************************************************/
// Author: Fredrik Larsson | epost.larsson@gmail.com
/**********************************************************/

// Init Angular app 'postcardApp' & controller 'appCtrl'
var postcardApp = angular.module('postcardApp', []);
postcardApp.controller('appCtrl', ['$scope', '$http', function($scope, $http) {

	// Options to sort 'search' by date as default
	$scope.sortOption = 'date';

	// Get all postcards from db (GET->'/postcards' / RETURNS json)
	$scope.refresh = function() {
		$http.get('/postcards').success(function(response) {
			$scope.postcards = response;
		});
	};

	// Init
	$scope.refresh();

	// Unset function for postcard. Called after sent postcard to clear inputs for "Send more" function without page-reload
	$scope.unset = function() {
		$scope.postcard.image = "";
		$scope.postcard.greeting = "";
		$scope.postcard.name = "";
		$scope.postcard.location = "";
		$scope.postcard.private = false;
		$scope.postcard.hint = "";
		$scope.postcard.key = "";
	};

	// Triggered on keyup in form, validates checkbox and require fields. If complete->Show "Send postcard"-button
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

	// Post new postcard from form to server->DB
	$scope.addPostcard = function() {
		
		// Validate required fields (if user hits enter even if button is hidden until valid)
		if ($scope.postcardForm.$valid) {
			
			if($scope.postcard.private && $scope.postcard.hint.length > 0 && $scope.postcard.key.length > 0 || !$scope.postcard.private) {
				
				// Set date and escape spaces/lowercase the "key" before posting scope
				$scope.postcard.date = new Date();
				$scope.postcard.key = $scope.postcard.key.toLowerCase().replace(/\s+/g, "");
				$http.post('/postcards', $scope.postcard).success(function(response) {
					
					// Create and prepend element with a link to share the postcard
					$scope.shareUrl = "https://larsson-postcardapp.herokuapp.com/mailbox.html?id=" + response._id;
					
					$("#main-app-container").animate({ opacity: 0 }, 100, function() {

						var element = '<div id="share-link"><p>Share this link with your loved ones!</p><p><a href="' + 
						$scope.shareUrl + '">' + $scope.shareUrl + 
						'</a></p><p onclick="closeSharelink()">Send more postcards!</p></div>';
						$("#toggle-container").prepend(element);

						$("#main-app-container").animate({ opacity: 1 }, 100);
					});

					// Refresh makes new postcard visible on page directly
					$scope.refresh();
					// Unset scope for instant clearing of form, user can send more without reloading page
					$scope.unset();
					
				});

			// If form is not valid
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

	// Animates visibility of inputs required if checkbox is true
	$scope.hideShowHintfield = function($element) {

		if ($scope.postcard.private) {
			$("#hintfield").animate({ height: "106px" }, 200);
			$(".label-body").css( "color", "#000" );
		} else {
			$("#hintfield").animate({ height: "0px" }, 200);
			$(".label-body").css( "color", "#ababab" );
		}
		
	};

	// Add 24 to limit if "Show more" i clicked
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

	/* For further development of admin UI */
	/*
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
	*/
}]);