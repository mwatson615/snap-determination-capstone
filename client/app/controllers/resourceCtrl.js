app.controller('ResourceCtrl', function($scope, $cookies, personFactory, $location) {

	let householdId = $cookies.get('householdId')
	console.log(householdId)
	personIdArray = [];
	let emplArray = []

	personFactory.getPersonByHousehold(householdId)
	.then((data) => {
		$scope.personArray = [];
		$scope.personId = [];
		let results = data.data
		for (i = 0; i < results.length; i++) {
			emplArray.push(results[i])

			if (results[i].hasResource === true && results[i].age > 17) {
			$scope.personArray.push(results[i]);
			// $scope.hhRes = $scope.personArray.length - 2;
			$scope.personId.push(results[i]._id);
			} else {
				return $location.url('/income')
			}
		}
		// console.log($scope.hhRes)
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
			if (emplArray[i].hasEmployer === true) {
				$location.url('/income')
			} else {
				$location.url('/shelter')
			}
		}
	}

})
