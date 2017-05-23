app.controller('ResourceCtrl', function($scope, $cookies, personFactory, $location) {

	let householdId = $cookies.get('householdId')
	let personId = [];
	// console.log(householdId, "hh id")
	if (householdId === undefined) {
		$location.url('/')
	}

// ROUTE ONLY GETS HH MEMBERS WHO HAVE RESOURCES
	$(document).ready(() => {
		personFactory.getPersonResByHousehold(householdId)
		.then((data) => {
			let results = data.data
			$scope.personArray = [];
			for (let i = 0; i < results.length; i++) {
				$scope.personArray.push(results[i]);
				personId.push(results[i]._id);
			}
		})
	})

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
