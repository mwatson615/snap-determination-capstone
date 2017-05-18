app.controller('ShelterCtrl', function($scope, $cookies, householdFactory, $location) {
	$(document).ready(function() {
		$('select').material_select();
	});

	$scope.householdId = $cookies.get('householdId')
	$scope.paysSUA = false;
	console.log($scope.householdId)

	$scope.getShelter = () => {
		let shelter = {
			"householdId": $scope.householdId,
			"shelterType": $scope.shelterType || '',
			"shelterCost": $scope.shelterCost || 0,
			"shelterPayFrequency": $scope.shelterFrequency || 'monthly',
			"paysSUA": $scope.paysSUA || false
		}
		console.log(shelter)
		householdFactory.addShelter(shelter)
		.then((data) => {
			$location.url('/results')
		})
	}
})
