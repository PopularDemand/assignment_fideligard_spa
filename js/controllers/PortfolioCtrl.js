fideligard.controller('PortfolioCtrl', ['$scope', 'transactionService', 'stockService', 'dateService', 'portfolioService',  function($scope, transactionService, stockService, dateService, portfolioService) {
  $scope.selectedContent = 'portfolio';
  $scope.dateInfo = dateService.get();
  $scope.portfolioStats = portfolioService.getStats($scope.dateInfo.date);
  $scope.ownedStocks = [];

  $scope._addHistoricalInfo = function(transaction) {
    var info = stockService.getFormattedStock(transaction.symbol, $scope.dateInfo.date)
    transaction.historicalInfo = info;
  }
  $scope.updateTransactions = function() {
    $scope.transactions = transactionService.getInfo();
    $scope.transactions.all.forEach(function(transaction) {
      $scope._addHistoricalInfo(transaction);
    })
  };
  $scope.updateTransactions();

  $scope.$watch('transactions.all', function(oldVal, newVal, scope) {
    $scope.updateTransactions();
  }, true);

  $scope.$watch('dateInfo.date', function(oldVal, newVal, scope) {
    $scope.updateTransactions();
    $scope.portfolioStats = portfolioService.getStats($scope.dateInfo.date);
  }, true)
  

  $scope.currentProfit = function(transaction) {
    return (transaction.historicalInfo.price * transaction.quantity) - transaction.price
  }


  // Development
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
          symbol: 'AAPL',
          type: 'buy'
    })
  }

  $scope.getStocks = function() {
    $scope.yep = portfolioService.getStocks($scope.dateInfo.date)
  }
}])