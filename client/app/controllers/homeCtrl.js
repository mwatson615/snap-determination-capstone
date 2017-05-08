app.controller('HomeCtrl', function($scope, $location) {
	$scope.proceed = () => {
		$location.url('/demo')
	}
})
