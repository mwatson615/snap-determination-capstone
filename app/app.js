// console.log('app.js')
const app = angular.module('Snap', ['ngRoute'])

app.config(function($routeProvider, $locationProvider) {
	$locationProvider.hashPrefix('')
	$routeProvider
	.when('/', {
		templateUrl: 'partials/home.html',
		controller: 'HomeCtrl'
	}).otherwise({
		redirectTo: '/'
	})
})
