app.controller('ShelterCtrl', function($scope, $cookies) {
	$(document).ready(function() {
		$('select').material_select();
	});

	$scope.householdId = $cookies.get('householdId')
	$scope.shelterType = '';
	$scope.shelterCost = '';
	$scope.shelterFrequency = '';
	$scope.paysSUA = false;
	// $scope.noRadio = 'no';
	// $scope.yesRadio = 'yes';

	$scope.getShelter = () => {
		let shelter = {
			"householdId": $scope.householdId,
			"shelterType": $scope.shelterType,
			"shelterCost": $scope.shelterCost,
			"shelterFrequency": $scope.shelterFrequency,
			"paysSUA": $scope.paysSUA
		}
		console.log(shelter)
	}
})
