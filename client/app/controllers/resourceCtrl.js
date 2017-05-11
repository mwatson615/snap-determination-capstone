app.controller('ResourceCtrl', function($scope) {
	$(document).ready(function() {
		$('select').material_select();
	});

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
})
