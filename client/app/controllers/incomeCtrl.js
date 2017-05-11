app.controller('IncomeCtrl', function($scope) {
	$(document).ready(function() {
		$('select').material_select();
	});
	$scope.payArray = [];
	let divider = 8,
	multiplier = 4.3,
	monthlyIncome = '';

	$scope.getSum = () => {
		$scope.totalIncome = $scope.payArray.reduce(function(acc, val) {
		return acc + val;
		}, 0);
	}

	$scope.calculateMonthly = () => {
		if ($scope.payFrequency === 'biweekly') {
			divider = 4;
			multiplier = 2.15;
		} else if ($scope.payFrequency === 'twiceMonthly') {
			divider = 4;
			multiplier = 2;
		} else if ($scope.payFrequency === 'monthly') {
			divider = 2;
			multiplier = 1;
		}
	monthlyIncome = ($scope.totalIncome / divider) * multiplier
	}

	$scope.getIncome = () => {
		$scope.getSum()
		$scope.calculateMonthly()
		let employment = {
			"employer": $scope.employer,
			"payFrequency": $scope.payFrequency,
			"payStubs": $scope.payArray,
			"monthlyIncome": monthlyIncome
		}
		console.log(employment)
	}
})
