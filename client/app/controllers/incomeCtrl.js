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
			let payTest = parseInt(paystubs[i].value)
			if (payTest[i] !== 'NaN' || null) {
			// 	console.log(typeof paystubs[i].value)
			paystubArr.push(parseInt(payTest));
		}
	}
	console.log(paystubArr)
	}

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
