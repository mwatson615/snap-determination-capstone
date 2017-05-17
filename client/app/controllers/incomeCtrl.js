app.controller('IncomeCtrl', function($scope, $cookies, personFactory) {
	// $(document).ready(function() {
	// 	$('select').material_select();
	// });

	let householdId = $cookies.get('householdId')
	console.log(householdId)
	$scope.personArray = [];
	$scope.personId = [];

	personFactory.getPersonByHousehold(householdId)
	.then((data) => {
		for (i = 0; i < data.length; i++) {
			if (data[i].hasEmployer === true) {
			$scope.hhInc = data.length - 1;
			$scope.personArray.push(data[i]);
			$scope.personId.push(data[i]._id);
		// console.log($scope.personId[i])
		}
		console.log($scope.personArray)
		}
	})
	.then(() => {
		$(document).ready(function() {
			$('select').material_select();
		});
	})

	$scope.householdId = $cookies.get('householdId')
	$scope.allPayArray = [];
	let divider = 8,
	multiplier = 4.3,
	monthlyIncome = [];

	$scope.totalIncome = []

	$scope.getSum = () => {
		for (let i = 0; i < $scope.personArray.length; i++) {
			$scope.totalIncome[i] = $scope.personArray[i].payArray.reduce(function(acc, val) {
			return acc + val;
			}, 0);
		}
	}
	$scope.calculateMonthly = () => {
		for (let i = 0; i < $scope.personArray.length; i++) {
		if ($scope.personArray[i].payFrequency === 'biweekly') {
			divider = 4;
			multiplier = 2.15;
		} else if ($scope.personArray[i].payFrequency === 'twiceMonthly') {
			divider = 4;
			multiplier = 2;
		} else if ($scope.personArray[i].payFrequency === 'monthly') {
			divider = 2;
			multiplier = 1;
		}
		monthlyIncome[i] = ($scope.totalIncome[i] / divider) * multiplier
		}
	}

	$scope.getIncome = () => {
		for (let i = 0; i < $scope.personId.length; i++) {
			let personId = $scope.personId[i]
		$scope.getSum()
		$scope.calculateMonthly()
		let employment = {
			"personId": personId,
			"employer": $scope.personArray[i].employer,
			"payFrequency": $scope.personArray[i].payFrequency,
			"payStubs": $scope.personArray[i].payArray,
			"monthlyIncome": monthlyIncome[i]
		}
		console.log(employment)
		personFactory.addIncome(employment)
		.then((data) => {
			console.log(data, "ctrl income data")
		})
	}
	}
})
