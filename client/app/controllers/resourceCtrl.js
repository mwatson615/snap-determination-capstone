app.controller('ResourceCtrl', function($scope, $cookies, personFactory, $location) {

	let householdId = $cookies.get('householdId')
	console.log(householdId)
	let emplArray = []

	personFactory.getPersonByHousehold(householdId)
	.then((data) => {
		$scope.personArray = [];
		$scope.personId = [];
		let results = data.data
		console.log(results)
		for (i = 0; i < results.length; i++) {
			if (results[i].hasEmployer === true && results[i].age > 17) {
			emplArray.push(results[i])
			}

			if (results[i].age > 17 && results[i].hasResource === true) {
			$scope.personArray.push(results[i]);
			$scope.personId.push(results[i]._id);
			console.log($scope.personArray)
			}
		}
		if ($scope.personArray.length === 0) {
			return $location.url('/income')
		}
		console.log($scope.personArray)
		console.log(emplArray)
	})

	$scope.saveResources = () => {
		console.log(emplArray)
		for (let i = 0; i < $scope.personArray.length; i++) {
		let resources = {
			"personId": $scope.personId[i],
			"resourceBalance": $scope.personArray[i].balance || 0
		}
		personFactory.addResource(resources)
			.then((data) => {
				let results = data.data
				console.log(data, "after resources")
			})
		}
		for (let i = 0; i < emplArray.length; i++) {
			if (emplArray.length > 0) {
				return $location.url('/income')
			} else {
				return $location.url('/shelter')
			}
		}
	}

})
