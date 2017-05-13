app.controller('ResourceCtrl', function($scope, $cookies, personFactory) {
	// 	$(document).ready(function() {
	// 	$('select').material_select();
	// });

	let householdId = $cookies.get('householdId')
	console.log(householdId)
	$scope.people = [];
	$scope.personId = [];

	personFactory.getPersonByHousehold(householdId)
	.then((data) => {
		for (i = 0; i < data.length; i++) {
			$scope.people.push(data[i]);
			$scope.personId[i] = data[i]._id;
		console.log($scope.people)
		}
	})
	.then(() => {
		$(document).ready(function() {
			$('select').material_select();
		});
	})

	// let resourceType = [],
	// 	resourceBalance = [];

	// $scope.resType = [];
	// $scope.resBalance = [];
	$scope.saveResources = () => {
	// 	for (i = 0; i < $scope.resType.length; i++) {
	// 	resourceType.push($scope.resType[i])
	// 	resourceBalance.push($scope.resBalance[i])
	// }
		let resources = {
			"personId": $scope.personId,
			"resourceType" : $scope.resType,
			"resourceBalance" : $scope.resBalance
		}
		console.log(resources)
		// personFactory.addResource(resources)
		// .then((data) => {
		// 	console.log(data)
		// })
	}
})
