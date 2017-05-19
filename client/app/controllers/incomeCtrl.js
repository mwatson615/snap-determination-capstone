app.controller('IncomeCtrl', function($scope, $cookies, personFactory, $location) {

	let householdId = $cookies.get('householdId')

	personFactory.getPersonByHousehold(householdId)
	.then((data) => {
		$scope.hhInc = 0;
		$scope.personArray = [];
		$scope.personId = [];
		let results = data.data;
		for (i = 0; i < results.length; i++) {
			if (results[i].hasEmployer === true &&
				results[i].age > 17) {
				$scope.personArray.push(results[i]);
				$scope.personId.push(results[i]._id);
			}
		}
		if ($scope.personArray.length === 0) {
				console.log($scope.personArray.length)
				$location.url('/shelter')
			}
	})
	.then(() => {
		$(document).ready(function() {
			$('select').material_select();
		});
	})
	$scope.totalIncome = [];
	let divider = '',
	multiplier = '',
	monthlyIncome = [];

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
		} else {
			divider = 8;
			multiplier = 4.3;
		}
		monthlyIncome[i] = ($scope.totalIncome[i] / divider) * multiplier
		}
	}

	$scope.getIncome = () => {
		for (let i = 0; i < $scope.personId.length; i++) {
		$scope.getSum()
		$scope.calculateMonthly()
		let employment = {
			"personId": $scope.personId[i],
			"employer": $scope.personArray[i].employer,
			"payFrequency": $scope.personArray[i].payFrequency,
			"payStubs": $scope.personArray[i].payArray,
			"monthlyIncome": monthlyIncome[i] || 0
		}
		personFactory.addIncome(employment)
		.then((data) => {
		})
	}
	$location.url('/shelter')
	}

	$scope.restart = () => {
		$cookies.remove('householdId')
		$location.url('/')
	}
})
