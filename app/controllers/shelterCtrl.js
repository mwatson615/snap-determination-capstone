app.controller('ShelterCtrl', function($scope, $cookies, householdFactory, $location) {
	let householdId = $cookies.get('householdId')
	if (householdId === undefined) {
		$location.url('/')
	}
	$(document).ready(function() {
		$('select').material_select();
	});

	$scope.paysSUA = false;

	$scope.getShelter = () => {
		let shelter = {
			"householdId": householdId,
			"shelterType": $scope.shelterType || '',
			"shelterCost": $scope.shelterCost || 0,
			"shelterPayFrequency": $scope.shelterFrequency || 'monthly',
			"paysSUA": $scope.paysSUA || false
		}
		householdFactory.addShelter(shelter)
		.then((data) => {
			$location.url('/results')
		})
	}

	$scope.restart = () => {
		$cookies.remove('householdId')
		$location.url('/')
	}
})
