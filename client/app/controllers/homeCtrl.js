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
			console.log(id)
		})
		.then(() => {
			$location.url('/demo')
		})
	}
})
