app.controller('DemoCtrl', function($scope, $route, personFactory, $location, $cookies) {

	$scope.householdId = $cookies.get('householdId')
	console.log(householdId)
	$scope.people = [{}]

	$scope.getPeople = () => {
		$scope.people = [
			{
				firstName: $scope.firstName1,
				age: $scope.age1,
				hasResource: $scope.hasResource1 || false,
				hasEmployer: $scope.hasEmployer1 || false
			},
			{
				firstName: $scope.firstName2,
				age: $scope.age2,
				hasResource: $scope.hasResource2 || false,
				hasEmployer: $scope.hasEmployer2 || false
			},
			{
				firstName: $scope.firstName3,
				age: $scope.age3,
				hasResource: $scope.hasResource3 || false,
				hasEmployer: $scope.hasEmployer3 || false
			},
			{
				firstName: $scope.firstName4,
				age: $scope.age4,
				hasResource: $scope.hasResource4 || false,
				hasEmployer: $scope.hasEmployer4 || false
			},
			{
				firstName: $scope.firstName5,
				age: $scope.age5,
				hasResource: $scope.hasResource5 || false,
				hasEmployer: $scope.hasEmployer5 || false
			},
			{
				firstName: $scope.firstName6,
				age: $scope.age6,
				hasResource: $scope.hasResource6 || false,
				hasEmployer: $scope.hasEmployer6 || false
			},
			{
				firstName: $scope.firstName7,
				age: $scope.age7,
				hasResource: $scope.hasResource7 || false,
				hasEmployer: $scope.hasEmployer7 || false
			},
			{
				firstName: $scope.firstName8,
				age: $scope.age8,
				hasResource: $scope.hasResource8 || false,
				hasEmployer: $scope.hasEmployer8 || false
			}
		]
	}

	$scope.hh = 1;
	$scope.addField = () => {
		$scope.hh++;
	}

//  GETS INFO ENTERED TO ROUTE TO EITHER RESOURCE, INCOME,
//  SHELTER DEPENDING ON INPUT VALUES
	$scope.getPersonByHH = (householdId) => {
		personFactory.getPersonByHousehold(householdId)
				.then((data) => {
					let results = data.data;
					console.log(results, "person data")
					for (i = 0; i < results.length; i++) {
						if (results[i].age > 17 && results[i].hasResource === true) {
							console.log('adult resources')
							$location.url('/resources')
						} else if (results[i].age > 17 && results[i].hasEmployer === true) {
							console.log('adult income')
							$location.url('/income')
						} else {
							console.log('no adult resources or income')
							$location.url('/shelter')
						}
					}
				})
	}

	let newPerson = [];
	let resultsArray = [];

	$scope.getDemo = () => {
		$scope.getPeople()
		let size = $scope.hh - 1;
		let max = 7;
		$scope.people.splice($scope.hh, max - size)
		for (let i = 0; i < $scope.hh; i++) {
				newPerson[i] = {
					"householdId": householdId,
					"firstName": $scope.people[i].firstName,
					"age": $scope.people[i].age,
					"hasResource": $scope.people[i].hasResource,
					"hasEmployer": $scope.people[i].hasEmployer
		}
		personFactory.createPerson(newPerson[i])
		.then((results) => {
			})
		}
		$scope.getPersonByHH($scope.householdId)
	}
})
