app.controller('ResourceCtrl', ['$cookies', function($scope, $cookies) {
	$(document).ready(function() {
		$('select').material_select();
	});



	$scope.popPage = () => {
		personFactory.getPersonByHousehold()
	}

	$scope.resType = [];
	$scope.resBalance = [];
	$scope.getResources = () => {
		let resources = {
			"resourceType" : [$scope.resType],
			"resourceBalance" : [$scope.resBalance]
		}
		console.log(resources)
	}

	$scope.addResource = () => {
		console.log('add resource btn')
	}
}])
