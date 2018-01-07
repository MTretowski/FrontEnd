let app = angular.module('FrontEnd', ['ngCookies', 'ui.bootstrap']);
app.factory('authInterceptor', function () {
    return {
        request: function (config) {
            config.headers["Content-Type"] = 'application/json';
            return config;
        }
    };
});

app.config(['$qProvider', '$httpProvider', function ($qProvider, $httpProvider) {
    $qProvider.errorOnUnhandledRejections(false);
    $httpProvider.interceptors.push('authInterceptor');
}]);
