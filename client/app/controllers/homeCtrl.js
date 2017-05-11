app.controller('HomeCtrl', function($scope, $location) {
	$scope.proceed = () => {
		let newHousehold = {
			"zipcode": $scope.zipcode,
			"peopleArray": []
		}
		console.log(newHousehold)
		// $location.url('/demo')
	}
})
