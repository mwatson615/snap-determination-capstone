app.controller('IncomeCtrl', function($scope, $cookies, personFactory) {
	// $(document).ready(function() {
	// 	$('select').material_select();
	// });

	let householdId = $cookies.get('householdId')
	console.log(householdId)
	$scope.people = [];
	$scope.personId = [];

	personFactory.getPersonByHousehold(householdId)
	.then((data) => {
		for (i = 0; i < data.length; i++) {
			$scope.people.push(data[i]);
			$scope.personId.push(data[i]._id);
		console.log($scope.personId[i])
		}
	})
	.then(() => {
		$(document).ready(function() {
			$('select').material_select();
		});
	})

	$scope.householdId = $cookies.get('householdId')
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
		for (let i = 0; i < $scope.personId.length; i++) {
			let personId = $scope.personId[i]
		$scope.getSum()
		$scope.calculateMonthly()
		let employment = {
			"personId": personId,
			"employer": $scope.employer,
			"payFrequency": $scope.payFrequency,
			"payStubs": $scope.payArray,
			"monthlyIncome": monthlyIncome
		}
		// console.log(employment)
		personFactory.addIncome(employment)
		.then((data) => {
			console.log(data, "ctrl income data")
		})
	}
	}
})
