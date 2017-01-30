fideligard.directive('tradeForm', ['$state', 'transactionService', function($state, transactionService) {
  return {
    restrict: 'E',
    templateUrl: '/js/directives/trade-form.html',
    scope: {
      'stock': '=',
      'dateInfo': '='
    },
    link: function(scope) {
      scope.trade = {};
      scope.trade.quantity = scope.trade.quantity || 1;
      scope.calculateCost = function() {
        if (scope.stock)
          return Number(scope.stock.Close) * scope.trade.quantity;
      }
      scope.placeOrder = function() {
        console.log(scope.form.$valid)
        if (scope.form.$valid) {
          scope.trade.date = scope.dateInfo.date;
          scope.trade.symbol = scope.stock.symbol;
          scope.trade.price = scope.calculateCost();
          transactionService.addTransaction(scope.trade);
        }
      }
      scope.goToTransactions = function() {
        $state.go('index.transactions')
      }
    }
  }
}])