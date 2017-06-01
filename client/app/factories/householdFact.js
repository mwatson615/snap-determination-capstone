app.factory('householdFactory', ($http) => {

	return {

		createHousehold : (newHousehold) => {
			return $http.post('https://tennlabs-snaptest.herokuapp.com/api/v1/household/new', JSON.stringify(newHousehold))
			.then((data) => {
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		},
		addShelter : (shelter) => {
			return $http.patch('https://tennlabs-snaptest.herokuapp.com/api/v1/household/addShelter', JSON.stringify(shelter))
			.then((data) => {
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		},
		getHouseholdById : (householdId) => {
			return $http.get(`https://tennlabs-snaptest.herokuapp.com/api/v1/household/${householdId}`)
			.then((data) => {
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		},
		getResults : (householdId) => {
			return $http.get(`https://tennlabs-snaptest.herokuapp.com/api/v1/household/results/${householdId}`)
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
