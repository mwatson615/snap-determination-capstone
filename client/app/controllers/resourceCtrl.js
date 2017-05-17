app.controller('ResourceCtrl', function($scope, $cookies, personFactory) {

	let householdId = $cookies.get('householdId')
	console.log(householdId)
	$scope.personArray = [];
	let personIdArray = [];

	personFactory.getPersonByHousehold(householdId)
	.then((data) => {
// //TODO : ONLY ONE LINE PER ADULT, REWORK PARTIAL TO JUST ASK TOTAL PER ADULT
		for (i = 0; i < data.length; i++) {
			if (data[i].hasResource === true)
			$scope.personArray.push(data[i]);
			$scope.hhRes = data.length -1
			personIdArray[i] = data[i]._id;
			$scope.personArray[i].balance = '';
		}
	})

	let resourceBalance = [];

	$scope.saveResources = () => {
		for (i = 0; i < $scope.personArray.length; i++) {
		let resources = {
			"personId": personIdArray[i],
			"resourceBalance": $scope.personArray[i].balance
		}
		personFactory.addResource(resources)
		.then((data) => {

		})
	}
	}
})
