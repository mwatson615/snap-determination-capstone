app.controller('ResultsCtrl', function($scope, $cookies) {
	console.log('results ctrl')

	$scope.householdId = $cookies.get('householdId')
})
