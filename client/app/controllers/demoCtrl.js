app.controller('DemoCtrl', function($scope, $route, personFactory, $location, $cookies) {

	$scope.householdId = $cookies.get('householdId')
	$scope.hasSSN = false;
	$scope.hasResource = false;
	$scope.hasEmployer = false;
	$scope.personArray = []
	console.log($scope.householdId)


//  MOVE TO APP FOR RESOLVE -- TODO
	$scope.getPersonByHH = (householdId) => {
		personFactory.getPersonByHousehold(householdId)
				.then((data) => {
					console.log(data, "person data")
					for (i = 0; i < data.length; i++) {
						if (data[i].age > 17 && data[i].hasResource === true) {
							console.log('adult resources')
							$location.url('/resources')
						} else if (data[i].age > 17 && data[i].hasEmployer === true) {
							console.log('adult income')
							$location.url('/income')
						} else {
							console.log('no adult resources or income')
							$location.url('/shelter')
						}
					}
				})
	}

	$scope.getDemo = () => {
		let newPerson = {
			"householdId": $scope.householdId,
			"firstName": $scope.firstName,
			"age": $scope.age,
			"hasResource": $scope.hasResource,
			"hasEmployer": $scope.hasEmployer
		}
		personFactory.createPerson(newPerson)
		.then((results) => {
			console.log(results)
			$scope.getPersonByHH(results._id)
			})
	}
})
