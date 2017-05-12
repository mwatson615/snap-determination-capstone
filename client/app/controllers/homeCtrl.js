app.controller('HomeCtrl', function($scope, $location, householdFactory) {
	
	$scope.proceed = () => {
		let newHousehold = {
			"zipcode": $scope.zipcode,
			"peopleArray": []
		}
		householdFactory.createHousehold(newHousehold)
		.then((results) => {
			$scope.householdId = results.data._id
			console.log($scope.householdId)
		})
		// $location.url('/demo')
	}
})
