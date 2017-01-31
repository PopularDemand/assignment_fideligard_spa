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
        tradeDate = scope.dateInfo.date.getTime();
        if (scope.form.$valid) {
          scope.trade.date = tradeDate;
          scope.trade.symbol = scope.stock.Symbol;
          scope.trade.price = scope.calculateCost();
          transactionService.addTransaction(scope.trade);
          $state.go('index.transactions');
        }
      };
    }
  }
}])