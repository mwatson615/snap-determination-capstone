app.controller('IncomeCtrl', function($scope, $cookies, personFactory, $location) {

	let householdId = $cookies.get('householdId')

// ROUTE ONLY GETS HH MEMBERS WHO HAVE EMPLOYERS
	personFactory.getPersonIncByHousehold(householdId)
	.then((data) => {
		$scope.hhInc = 0;
		$scope.personArray = [];
		$scope.personId = [];
		let results = data.data;
		if (results.length === 0) {
			$location.url('/shelter')
		}
		for (let i = 0; i < results.length; i++) {
				$scope.personArray.push(results[i]);
				$scope.personId.push(results[i]._id);
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

// EACH PAY VALUE ADDED TO ARRAY, THEN SUM VALUE
	$scope.getSum = () => {
		for (let i = 0; i < $scope.personArray.length; i++) {
			$scope.totalIncome[i] = $scope.personArray[i].payArray.reduce(function(acc, val) {
			return acc + val;
			}, 0);
		}
	}

//PAY FREQUENCY DETERMINES FORMULA TO FIND MONTHLY INCOME
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

//PAY AMOUNTS SAVED TO PERSON AND MONTHLY INC SAVED TO HOUSEHOLD
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
