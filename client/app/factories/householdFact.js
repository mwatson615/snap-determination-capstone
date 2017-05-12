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
		}
	}
})
