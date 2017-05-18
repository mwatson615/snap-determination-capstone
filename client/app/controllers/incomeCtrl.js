app.controller('IncomeCtrl', function($scope, $cookies, personFactory, $location) {
	// $(document).ready(function() {
	// 	$('select').material_select();
	// });

	let householdId = $cookies.get('householdId')
	console.log(householdId)
	

	personFactory.getPersonByHousehold(householdId)
	.then((data) => {
		$scope.hhInc = 0;
		$scope.personArray = [];
		let newArray = []
		$scope.personId = [];
		let results = data.data;
		for (i = 0; i < results.length; i++) {
			
			if (results[i].hasEmployer === true &&
				results[i].age > 17) {
				$scope.personArray.push(results[i]);
				$scope.hhInc = $scope.personArray.length - 1;
				$scope.personId.push(results[i]._id);
			// console.log($scope.personId[i])
			}
		}
		console.log(newArray)
		console.log($scope.hhInc)
		console.log($scope.personArray.length)
		console.log($scope.personId)
	})
	.then(() => {
		$(document).ready(function() {
			$('select').material_select();
		});
	})
	$scope.totalIncome = [];
	// $scope.householdId = $cookies.get('householdId')
	// $scope.allPayArray = [];
	let divider = 8,
	multiplier = 4.3,
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
			"monthlyIncome": monthlyIncome[i]
		}
		console.log(employment)
		personFactory.addIncome(employment)
		.then((data) => {
			console.log(data, "ctrl income data")
		})
	}
	$location.url('/shelter')
	}
})
