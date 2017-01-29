fideligard.controller('StockPanelCtrl', ['$scope', '$http', 'stockService', 'dateService', function($scope, $http, stockService, dateService) {
  
  $scope.stocks = [];
  $scope.dateInfo = dateService.get();
  
  stockService.getStocks($scope.dateInfo.date).then(function(stocks) {
    $scope.stocks = stocks;
  });

  $scope.$watch('dateInfo.date', function(oldVal, newVal, scope) {
    scope.getStocks();
  }, true)

  $scope.getStocks = function() {
    stockService.getStocks().then(function(stocks) {
      if (stocks !== $scope.stocks) {
        $scope.stocks = stocks;
      }
    });
  }

}])