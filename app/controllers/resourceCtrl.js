app.controller('ResourceCtrl', function($scope, $cookies, personFactory, $location, resourceData) {

	let householdId = $cookies.get('householdId')
	console.log(householdId, "hh id")
	if (householdId === undefined) {
		$location.url('/')
	}

// ROUTE ONLY GETS HH MEMBERS WHO HAVE RESOURCES
			let personId = [];
			$scope.personArray = resourceData.data
			if ($scope.personArray.length === 0) {
				$location.url('/income')
			}
			for (let i = 0; i < $scope.personArray.length; i++) {
				// $scope.personArray.push(results[i]);
				personId.push($scope.personArray[i]._id);
			}

// SAVES RESOURCES TO PERSON AND THEN TO HOUSEHOLD
	$scope.saveResources = () => {
		for (let i = 0; i < $scope.personArray.length; i++) {
			let resources = {
				"personId": personId[i],
				"resourceBalance": $scope.personArray[i].balance || 0
			}
		personFactory.addResource(resources)
			.then((data) => {
				let results = data.data
			})
		}
		$location.url('/income')
	}

	$scope.restart = () => {
		$cookies.remove('householdId')
		$location.url('/')
	}

})
