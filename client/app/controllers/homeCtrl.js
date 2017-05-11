app.controller('HomeCtrl', function($scope, $location) {
	$scope.proceed = () => {
		console.log($scope.zipcode)
		// $location.url('/demo')
	}
})
