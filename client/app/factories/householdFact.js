app.factory('householdFactory', ($http) => {

	return {

		createHousehold : (newHousehold) => {
			return $http.post('http://localhost:3000/api/v1/household/new', JSON.stringify(newHousehold))
			.then((data) => {
				console.log(data, 'household created')
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		},
		addShelter : (shelter) => {
			return $http.patch('http://localhost:3000/api/v1/household/addShelter', JSON.stringify(shelter))
			.then((data) => {
				console.log(data, "shelter created")
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		},
		getHouseholdById : (householdId) => {
			return $http.get(`http://localhost:3000/api/v1/household/${householdId}`)
			.then((data) => {
				console.log(data)
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		},
		getResults : (householdId) => {
			return $http.get(`http://localhost:3000/api/v1/household/results/${householdId}`)
			.then((data) => {
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		}
	}
})
