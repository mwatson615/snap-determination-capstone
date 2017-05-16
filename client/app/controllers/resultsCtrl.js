app.controller('ResultsCtrl', function($scope, $cookies, personFactory, householdFactory) {

	let householdId = $cookies.get('householdId')
	console.log(householdId)

	householdFactory.getResults(householdId)
	.then((data) => {
		console.log(data)
		let results = data.data
		// $scope.householdArray = data.data
		$scope.householdSize = results.householdSize;
		$scope.totalResources = results.resourceSum;
		$scope.totalIncome = results.incomeSum;
		$scope.benefitAmount = results.benefitAmount;
		$scope.shelterCost = results.shelterCost;
		$scope.shelterDed = results.shelterDeduction;
		$scope.shelterType = results.shelterType;

		if (results.paysSUA === true) {
			$scope.paysSUA = 'do'
		} else {
			$scope.paysSUA = 'do not'
		}
	})

	// $scope.testAgain = () => {
	// 	$cookies.remove('householdId')
	// 	$location.url('/')
	// }

})
