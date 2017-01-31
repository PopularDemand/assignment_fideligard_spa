fideligard.controller('PortfolioCtrl', ['$scope', 'transactionService', function($scope, transactionService) {
  $scope.selectedContent = 'portfolio';

  $scope.updateTransactions = function() {
    $scope.transactions = transactionService.getInfo();
  };
  $scope.updateTransactions();

  $scope.$watch('transactions.all', function(oldVal, newVal, scope) {
    $scope.updateTransactions();
  }, true);
}])