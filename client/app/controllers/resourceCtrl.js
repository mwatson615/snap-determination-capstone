app.controller('ResourceCtrl', function($scope, $cookies, personFactory) {
	// $(document).ready(function() {
	// 	$('select').material_select();
	// });

	let householdId = $cookies.get('householdId')
	console.log(householdId)
	$scope.personArray = [];
	let personIdArray = [];

	personFactory.getPersonByHousehold(householdId)
	.then((data) => {
// //TODO : ONLY ONE LINE PER ADULT, REWORK PARTIAL TO JUST ASK TOTAL PER ADULT
		console.log(data)
		for (i = 0; i < data.length; i++) {
			$scope.personArray.push(data[i]);
			personIdArray[i] = data[i]._id;
		console.log($scope.personArray)
		}
	})
	// .then(() => {
	// 	$(document).ready(function() {
	// 		$('select').material_select();
	// 	});
	// })

	// let resourceType = [],
	let resourceBalance = [];

	// $scope.resType = '';
	// $scope.resBalance = '';
	$scope.saveResources = (balance) => {
		for (i = 0; i < $scope.personArray.length; i++) {
	// // 	resourceType.push($scope.resType[i])
		resourceBalance.push($scope.balance)
		let resources = {
			"personId": personIdArray[i],
			// "resourceType" : $scope.resTyp,
			"resourceBalance": resourceBalance[i]
		}
		personFactory.addResource(resources)
		.then((data) => {
			console.log(data)
		})
		console.log(resources)
	}
	}
})
