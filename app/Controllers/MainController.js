app.controller('mainController', function ($cookieStore, $rootScope, $scope, $uibModal) {

    $scope.username = '';
    $scope.password = '';
    $scope.firstName = '';
    $scope.lastName = '';
    $scope.userRole = '';

    {
        if ($cookieStore.get('firstName')) {
            $scope.firstName = $cookieStore.get('firstName')
        }

        if ($cookieStore.get('lastName')) {
            $scope.lastName = $cookieStore.get('lastName')
        }

        if ($cookieStore.get('userRole')) {
            $scope.userRole = $cookieStore.get('userRole')
        }
    }

    $scope.editPassword = function () {
        $uibModal.open({
            templateUrl: 'Views/Modals/PasswordModal.html',
            controller: 'editPasswordController',
            backdrop: 'static',
            size: 'sm'
        });
    };

    $rootScope.checkPermissions = function () {
        return userRole;
    };

    $scope.logIn = function () {
        if ($scope.username === "user" && $scope.password === "user") {
            $cookieStore.put('userRole', 'user');
            $scope.userRole = 'user';
            loggedIn();
        }
        else if ($scope.username === "admin" && $scope.password === "admin") {
            $cookieStore.put('userRole', 'admin');
            $scope.userRole = 'admin';
            loggedIn();
        }
        else {
            alert("Niepoprawny login lub hasło");
        }
    };

    let loggedIn = function () {
        $scope.username = '';
        $scope.password = '';
    };

    $rootScope.checkPermissions = function () {
        return $scope.userRole;
    };

    $scope.logOut = function () {
        $cookieStore.remove('userRole');
        $cookieStore.remove('firstName');
        $cookieStore.remove('lastName');
        $scope.firstName = '';
        $scope.lastName = '';
        $scope.userRole = '';
    }
});