fideligard.controller('StockPanelCtrl', ['$scope', '$http', 'stockService', function($scope, $http, stockService) {
  
  stockService.getStocks().then(function(stocks) {
    $scope.stocks = stocks;
  });

  // TODO start here:
  // Need to capture _date from date service and
  // pass that into stocks

  $scope.getStocks = function() {
    stockService.getStocks().then(function(stocks) {
      $scope.stocks = stocks;
    });
  }

}])