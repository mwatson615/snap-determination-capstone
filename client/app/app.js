const app = angular.module('Snap', ['ngRoute', 'ngCookies'])

app.config(function($routeProvider, $locationProvider) {

	$locationProvider.hashPrefix('')
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'HomeCtrl'
	}).when('/demo', {
		templateUrl: 'partials/demo.html',
		controller: 'DemoCtrl'
	}).when('/resources', {
		templateUrl: 'partials/resource.html',
		controller: 'ResourceCtrl',
		resolve: {
			resourceData (personFactory, $cookies) {
				let householdId = $cookies.get('householdId')
				return personFactory.getPersonResByHousehold(householdId)
				.catch(() => $location.url('/resources'))
				}
			}
	}).when('/income', {
		templateUrl: 'partials/income.html',
		controller: 'IncomeCtrl',
		resolve: {
			incomeData (personFactory, $cookies) {
				let householdId = $cookies.get('householdId')
				return personFactory.getPersonIncByHousehold(householdId)
				.catch(() => $location.url('/income'))
			}
		}
	}).when('/shelter', {
		templateUrl: 'partials/shelter.html',
		controller: 'ShelterCtrl'
	}).when('/results', {
		templateUrl: 'partials/results.html',
		controller: 'ResultsCtrl'
	}).otherwise({
		redirectTo: '/'
	})
});
