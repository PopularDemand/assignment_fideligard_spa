fideligard.controller('TradeCtrl', ['$scope', '$stateParams', 'stockService', 'dateService', 'helpers', function($scope, $stateParams, stockService, dateService, helpers) {

  $scope.stockHistory = stockService.getStock($stateParams.symbol);
  $scope.dateInfo = dateService.get();
  $scope.selectedContent = 'trade';
  $scope.stock;
  $scope.tradeValidity = {
    messages: []
  }

  $scope.$watch('dateInfo.date', function(oldVal, newVal, scope) {
    scope.getPrice();
  }, true)

  $scope.getPrice = function() {
    for (var i = 0; i < $scope.stockHistory.length; i++) {
      if (helpers.sameDate($scope.dateInfo.date, $scope.stockHistory[i].Date)) {
        $scope.stock = $scope.stockHistory[i];
        break;
      }
    }
  }
}])