var app = angular.module('FrontEnd', ['ngRoute']);

app.config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'Widoki/logowanie.html',
            controller: 'indexController1'
        })
        .when('/uzytkownik', {
            templateUrl: 'Widoki/uzytkownik.html',
            controller: 'indexController2'
        })
        .when('/administrator', {
            templateUrl: 'Widoki/administrator.html'
        })
        .otherwise({redirectTo: '/'});
});
