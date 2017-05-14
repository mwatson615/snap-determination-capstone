app.controller('ShelterCtrl', function($scope, $cookies, householdFactory, $location) {
	$(document).ready(function() {
		$('select').material_select();
	});

	$scope.householdId = $cookies.get('householdId')
	// $scope.shelterType = '';
	// $scope.shelterCost = '';
	// $scope.shelterFrequency = '';
	$scope.paysSUA = false;
	console.log($scope.householdId)

	$scope.getShelter = () => {
		let shelter = {
			"householdId": $scope.householdId,
			"shelterType": $scope.shelterType,
			"shelterCost": $scope.shelterCost,
			"shelterPayFrequency": $scope.shelterFrequency,
			"paysSUA": $scope.paysSUA
		}
		console.log(shelter)
		householdFactory.addShelter(shelter)
		.then((data) => {
			console.log(data, "shelter ctrl")
			// $location.url('/results')
		})
	}
})
