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
	// let resourceBalance = [];

	// $scope.resType = '';
	// $scope.resBalance = '';
	$scope.saveResources = (balance) => {
	// 	for (i = 0; i < $scope.people.length; i++) {
	// // 	resourceType.push($scope.resType[i])
	// 	resourceBalance.push($scope.resBalance)
	// }
		let resources = {
			"personId": personIdArray,
			// "resourceType" : $scope.resTyp,
			"resourceBalance": $scope.balance
		}
		console.log(resources)
		// personFactory.addResource(resources)
		// .then((data) => {
		// 	console.log(data)
		// })
	}
})
