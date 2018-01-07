app.controller('editPasswordController', function ($uibModalInstance, $scope, userId, usersService) {
    $scope.title = 'Zmiana hasła';
    $scope.acceptButtonTitle = 'Zmień hasło';
    $scope.passwordChange = true;

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };

    $scope.accept = function () {
        usersService.editPassword(userId, $scope.oldPassword, $scope.newPassword);
        $uibModalInstance.dismiss('cancel');
    }

});