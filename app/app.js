var app = angular.module('FrontEnd', ['ngCookies', 'ui.bootstrap']);
app.config(['$qProvider', function ($qProvider) {
    $qProvider.errorOnUnhandledRejections(false);
}]);
