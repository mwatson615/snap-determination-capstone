app.controller('IncomeCtrl', function($scope) {
	$(document).ready(function() {
		$('select').material_select();
	});
	let paystubArr = [];
	// $scope.show2 = false;
	// $scope.show4 = false;
	// $scope.show8 = false;
	// $scope.payFrequency = '';

	$scope.getPaystubs = (paystubs) => {
		for ( let i = 0; i < paystubs.length; i++) {
			paystubArr.push(parseInt(paystubs[i].value));
	}
	console.log(paystubArr)
	// return paystubArr;
	}

	// $scope.getPayFrequency = () => {
	// 	console.log($scope.payFrequency)
	// 	if ($scope.payFrequency === 'monthly') {
	// 		$scope.show2 = true;
	// 		return $scope.show2
	// 	} else  if ($scope.payFrequency === 'biweekly' || 'twiceMonthly') {
	// 		$scope.show2 = true;
	// 		$scope.show4 = true;
	// 		return $scope.show4;
	// 	} else if ($scope.payFrequency === 'weekly') {
	// 		$scope.show8 = true;
	// 		return $scope.show8;
	// 	}

	// }
	// $scope.getPayFrequency()
		// $scope.$apply()

	$scope.getIncome = () => {
		$scope.getPaystubs($('.paystubs'))
		let employment = {
			"employer": $scope.employer,
			"payFrequency": $scope.payFrequency,
			"payStubs": paystubArr
		}
		console.log(employment)
	}
})
