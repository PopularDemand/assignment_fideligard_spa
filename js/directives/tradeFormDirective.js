fideligard.directive('tradeForm', ['$state', 'transactionService', 'portfolioService', function($state, transactionService, portfolioService) {
  return {
    restrict: 'E',
    templateUrl: '/js/directives/trade-form.html',
    scope: {
      'stock': '=',
      'dateInfo': '=',
      'tradeValidity': '='
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
        scope.trade.date = tradeDate;
        scope.trade.symbol = scope.stock.Symbol;
        scope.trade.price = scope.calculateCost();
        if (scope.form.$valid && valid(scope.trade)) {
          transactionService.addTransaction(scope.trade);
          $state.go('index.transactions');
        }
      };

      var valid = function(transaction) {
        var _portfolioStats = portfolioService.getStats(transaction.date);
        if (transaction.type === 'buy') {
          if (_portfolioStats.cash < transaction.price) {
            scope.tradeValidity.messages.push('Not enough cash')
            return false;
          };

        } else {
          var stocks = portfolioService.getStocks(transaction.date);
          if (!(transaction.symbol in stocks) || stocks[transaction.symbol] < transaction.quantity) {
            // TODO check this for edge cases
            scope.tradeValidity.messages.push('Improper amount of stocks')
            return false;
          }
        }
        return true;
      }
    }
  }
}])