app.controller('resetPasswordController', function ($uibModalInstance, $scope, usersService, userId) {
    $scope.title = 'Reset hasła';
    $scope.acceptButtonTitle = 'Resetuj hasło';
    $scope.passwordChange = false;

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.accept = function () {
        usersService.resetPassword(userId, $scope.newPassword);
        $uibModalInstance.dismiss('cancel');
    }

});