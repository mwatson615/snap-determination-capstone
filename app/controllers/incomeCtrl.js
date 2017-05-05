app.controller('IncomeCtrl', function($scope) {
	$(document).ready(function() {
		$('select').material_select();
	});
	let paystubArr = [];

	$scope.getPaystubs = (paystubs) => {
		for ( let i = 0; i < paystubs.length; i++) {
			paystubArr.push(parseInt(paystubs[i].value));
	}
	console.log(paystubArr)
	// return paystubArr;
	}

	$scope.getPayFrequency = () => {
		
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
