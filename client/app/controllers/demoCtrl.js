app.controller('DemoCtrl', function($scope) {

	$scope.hasSSN = false;
	$scope.hasResource = false;
	$scope.hasEmployer = false;

	$scope.getDemo = () => {
		let newPerson = {
			"householdId": $scope.householdId,
			"firstName": $scope.firstName,
			"age": $scope.age,
			"hasSSN": $scope.hasSSN,
			"hasResource": $scope.hasResource,
			"hasEmployer": $scope.hasEmployer
		}
	console.log(newPerson)

	}
})
