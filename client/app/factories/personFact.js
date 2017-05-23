app.factory('personFactory', ($http, $q, $route, $location) => {

	return {

		createPerson : (newPerson) => {
			return $http.post('https://tennlabs-snaptest.herokuapp.com/api/v1/person/new', JSON.stringify(newPerson))
			.then((data) => {
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		},
		getPersonById : (personId) => {
			return $http.get(`https://tennlabs-snaptest.herokuapp.com/api/v1/person/${personId}`)
			.then((data) => {
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		},
		getPersonByHousehold : (householdId) => {
			return $http.get(`https://tennlabs-snaptest.herokuapp.com/api/v1/person/hh/${householdId}`)
			.then((data) => {
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		},
		addResource : (resources) => {
			return $http.patch('https://tennlabs-snaptest.herokuapp.com/api/v1/person/addResource', JSON.stringify(resources))
			.then((data) => {
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		},
		addIncome : (employment) => {
			return $http.patch('https://tennlabs-snaptest.herokuapp.com/api/v1/person/addIncome', JSON.stringify(employment))
			.then((data) => {
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		},
		getPersonResByHousehold : (householdId) => {
			return $http.get(`https://tennlabs-snaptest.herokuapp.com/api/v1/person/res/${householdId}`)
			.then((data) => {
				return data
			})
			.catch((err) => {
				let errorCode = err.code;
				let errorMessage = err.message;
				alert(errorCode + " : " + errorMessage)
			})
		},
		getPersonIncByHousehold : (householdId) => {
			return $http.get(`https://tennlabs-snaptest.herokuapp.com/api/v1/person/inc/${householdId}`)
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




//
