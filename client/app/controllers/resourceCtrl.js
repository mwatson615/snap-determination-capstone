app.controller('ResourceCtrl', function($scope, $cookies, personFactory, $location) {

	let householdId = $cookies.get('householdId')
	let emplArray = []

	personFactory.getPersonByHousehold(householdId)
	.then((data) => {
		$scope.personArray = [];
		$scope.personId = [];
		let results = data.data
		for (i = 0; i < results.length; i++) {
			if (results[i].hasEmployer === true && results[i].age > 17) {
			emplArray.push(results[i])
			}

			if (results[i].age > 17 && results[i].hasResource === true) {
			$scope.personArray.push(results[i]);
			$scope.personId.push(results[i]._id);
			}
		}
		if ($scope.personArray.length === 0) {
			return $location.url('/income')
		}
	})

	$scope.saveResources = () => {
		for (let i = 0; i < $scope.personArray.length; i++) {
		let resources = {
			"personId": $scope.personId[i],
			"resourceBalance": $scope.personArray[i].balance || 0
		}
		personFactory.addResource(resources)
			.then((data) => {
				let results = data.data
			if (emplArray.length > 0) {
				$location.url('/income')
			} else {
				$location.url('/shelter')
			}
			})
		}
	}

	$scope.restart = () => {
		$cookies.remove('householdId')
		$location.url('/')
	}

})
