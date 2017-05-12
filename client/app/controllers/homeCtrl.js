app.controller('HomeCtrl', function($scope, $location, householdFactory, $cookies) {

	$scope.proceed = () => {
		let newHousehold = {
			"zipcode": $scope.zipcode,
			"peopleArray": []
		}
		householdFactory.createHousehold(newHousehold)
		.then((results) => {
			$scope.householdId = results.data._id
			$cookies.put('householdId', $scope.householdId);
			var test = $cookies.get('householdId')
			console.log(test)
		})
		// $location.url('/demo')
	}
})
