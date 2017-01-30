fideligard.controller('TransactionCtrl', ['$scope', 'transactionService', function($scope, transactionService) {
    $scope.selectedContent = 'transactions';
    $scope.transactions = transactionService.getAll();
}])