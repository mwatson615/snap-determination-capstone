app.controller('ShelterCtrl', function($scope) {
	$(document).ready(function() {
		$('select').material_select();
	});
	$scope.shelterType = '';
	$scope.shelterCost = '';
	$scope.shelterFrequency = '';
	$scope.paysSUA = false;
	// $scope.noRadio = 'no';
	// $scope.yesRadio = 'yes';

	$scope.getShelter = () => {
		let shelter = {
			"shelterType": $scope.shelterType,
			"shelterCost": $scope.shelterCost,
			"shelterFrequency": $scope.shelterFrequency,
			"paysSUA": $scope.paysSUA
		}
		console.log(shelter)
	}
})
