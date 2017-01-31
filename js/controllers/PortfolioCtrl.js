fideligard.controller('PortfolioCtrl', ['$scope', 'transactionService', function($scope, transactionService) {
  $scope.selectedContent = 'portfolio';
  $scope.portfolioStats = {};

  $scope.updateTransactions = function() {
    $scope.transactions = transactionService.getInfo();
  };
  $scope.updateTransactions();

  $scope.$watch('transactions.all', function(oldVal, newVal, scope) {
    $scope.updateTransactions();
  }, true);

  $scope.populateTables = function() {
    $scope.portfolioStats.cash = 123456;
    $scope.portfolioStats.value = 456789;
    $scope.portfolioStats.profit = 123456;
    $scope.portfolioStats.dayProfit = -123;
    $scope.portfolioStats.weekProfit = -456;
    $scope.portfolioStats.monthProfit = 12345;

    $scope.transactions.all.push({
          date: new Date(),
          id: 1,
          price: 64.34,
          quantity: 2,
          symbol: 'AAL',
          type: 'buy'
    })

    $scope.transactions.all.push({
          date: new Date(),
          id: 2,
          price: 64.34,
          quantity: 2,
          symbol: 'AAL',
          type: 'buy'
    })

    $scope.transactions.all.push({
          date: new Date(),
          id: 3,
          price: 234.44,
          quantity: 43,
          symbol: 'GMO',
          type: 'buy'
    })
  }
}])