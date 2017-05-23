app.controller('HomeCtrl', function($scope, $location, householdFactory, $cookies) {

	$scope.proceed = () => {
		let newHousehold = {
			"zipcode": $scope.zipcode,
			"peopleArray": []
		}
		householdFactory.createHousehold(newHousehold)
		.then((results) => {
			let id = results.data._id
			$cookies.put('householdId', id);
			let householdId = $cookies.get('householdId')
		})
		.then(() => {
			if ($scope.zipcode === undefined) {
				alert("Please enter your zip code to continue")
		} else {
			$location.url('/demo')
		}
		})
	}
})
