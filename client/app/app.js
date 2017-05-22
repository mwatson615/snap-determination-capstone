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
		// resolve: {
		// 	data (personFactory, $location) {
		// 		return personFactory.getPersonByHousehold()
		// 		.catch(() => $location.url('/resources'))
		// 	}
		// }
	}).when('/income', {
		templateUrl: 'partials/income.html',
		controller: 'IncomeCtrl'
	}).when('/shelter', {
		templateUrl: 'partials/shelter.html',
		controller: 'ShelterCtrl'
	}).when('/results', {
		templateUrl: 'partials/results.html',
		controller: 'ResultsCtrl'
	}).otherwise({
		redirectTo: '/'
	})
	// $locationProvider.html5Mode(true);
});
