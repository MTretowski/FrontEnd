angular.module('FrontEnd', ['ngRoute']);

angular.module('FrontEnd').config(function ($routeProvider) {
    $routeProvider
        .when('/', {
            templateUrl: 'Widoki/logowanie.html',
            controller: 'logowanieKontroler'
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
