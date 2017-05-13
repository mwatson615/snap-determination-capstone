app.controller('ResourceCtrl', function($scope, $cookies, personFactory) {
	$(document).ready(function() {
		$('select').material_select();
	});

	let householdId = $cookies.get('householdId')
	console.log(householdId)



	$scope.popPage = () => {
		personFactory.getPersonByHousehold(householdId)
		.then((data) => {
			console.log(data)
		})
	}
	$scope.popPage();

	$scope.resType = [];
	$scope.resBalance = [];
	$scope.getResources = () => {
		let resources = {
			"household": $scope.household,
			"resourceType" : [$scope.resType],
			"resourceBalance" : [$scope.resBalance]
		}
		personFactory.addResource(resources)
	}
})
