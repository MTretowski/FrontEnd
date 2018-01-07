app.controller('saveImportedSummaryController', function ($uibModalInstance, $uibModal, $scope, $rootScope) {

    $scope.imported = null;
    $scope.notImported = null;

    $scope.areThereImported = false;
    $scope.areThereNotImported = false;

    $scope.showImported = false;
    $scope.sortingKey = '';
    $scope.descendingSort = false;

    $scope.showNotImported = false;
    $scope.notImportedSortingKey = '';
    $scope.notImportedDescendingSort = false;

    let now = new Date();
    let nowUTC = new Date(now.getUTCFullYear(), now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    let twoYearsAgo = new Date(now.getUTCFullYear() - 2, now.getUTCMonth(), now.getUTCDate(), now.getUTCHours(), now.getUTCMinutes(), now.getUTCSeconds());
    nowUTC.setUTCHours(23, 59, 59);
    twoYearsAgo.setUTCHours(0, 0, 0);
    $scope.dateFromFilter = twoYearsAgo;
    $scope.dateToFilter = nowUTC;

    $rootScope.$on('showImportSummary', function (event, imported, notImported) {
        $scope.imported = imported;
        $scope.notImported = notImported;
        {
            if (imported.length > 0) {
                $scope.areThereImported = true;
            }
            if (notImported.length > 0) {
                $scope.areThereNotImported = true;
            }
        }
    });

    $scope.close = function () {
        $uibModalInstance.dismiss('cancel');
    };
});