fideligard.directive('tradeForm', function() {
  return {
    restrict: 'E',
    templateUrl: '/js/directives/trade-form.html',
    scope: {
      'stock': '='
    },
    link: function(scope) {
      scope.quantity = scope.quantity || 1;
      scope.calculateCost = function() {
        return Number(scope.stock.Close) * scope.quantity;
      }
    }
  }
})