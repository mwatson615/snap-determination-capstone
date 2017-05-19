app.controller('ShelterCtrl', function($scope, $cookies, householdFactory, $location) {
	$(document).ready(function() {
		$('select').material_select();
	});

	$scope.householdId = $cookies.get('householdId')
	$scope.paysSUA = false;

	$scope.getShelter = () => {
		let shelter = {
			"householdId": $scope.householdId,
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
