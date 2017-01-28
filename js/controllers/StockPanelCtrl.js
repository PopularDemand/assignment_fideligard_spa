fideligard.controller('StockPanelCtrl', ['$scope', '$http', 'stockService', function($scope, $http, stockService) {
  
  stockService.getStocks().then(function(stocks) {
    $scope.stocks = stocks;
  });

  $scope.formatOneStock = function() {
    stockService.formatOneStock($scope.stocks);
  }

}])