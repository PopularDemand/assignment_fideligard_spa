fideligard.factory('stockService', ['$http', '$q', 'dateService', 'helpers', '_', function($http, $q, dateService, helpers, _) {

  var _stocks = [], _stocksBySymbol = {};
  var MILLIS_IN_DAY = 86400000;

  var getStocks = function(date) {
    return $http.get('/data/data.json').then(function(response) {
      stocks = response.data.datatable.data.map(_removeExtraData);
      stocksBySymbol = angular.copy(_.groupBy(stocks, "Symbol"), _stocksBySymbol);
      formattedStocks = [];
      for (stock in _stocksBySymbol) {
        formattedStocks.push(_formatOneStock(_stocksBySymbol[stock], date));
      }
      angular.copy(formattedStocks, _stocks);
      return _stocks;
    })
  }

  var getStock = function(symbol) {
    return _stocksBySymbol[symbol];
  };

  // used in portfolio ctrl
  var getFormattedStock = function(symbol, date) {
    return _formatOneStock(_stocksBySymbol[symbol], date)
  }

  var _removeExtraData = function(dailyTicker){
    return {
      Symbol: dailyTicker[0],
      Date: dailyTicker[1],
      Close: dailyTicker[5]
    }
  }

  var _formatOneStock = function(historicalDaily, date) {
    var dayAgo, weekAgo, monthAgo,
        price = 'NA', dayAgoPrice = 'NA',
        weekAgoPrice = 'NA', monthAgoPrice = 'NA',
        date = date || new Date(dateService.get().date);

    // Set day to friday if it is a weekend day
    if (date.getDay() === 6) {
      date = new Date(date - MILLIS_IN_DAY);
    } else if (date.getDay() === 0) {
      date = new Date(date - 2 * MILLIS_IN_DAY);
    }

    dayAgo = new Date(date - MILLIS_IN_DAY);
    weekAgo = new Date(date - 7 * MILLIS_IN_DAY);
    monthAgo = new Date(date - 30 * MILLIS_IN_DAY);

    historicalDaily.forEach(function(day) {
      if (helpers.sameDate(day.Date, date)) price = day.Close;
      if (helpers.sameDate(day.Date, dayAgo)) dayAgoPrice = day.Close;
      if (helpers.sameDate(day.Date, weekAgo)) weekAgoPrice = day.Close;
      if (helpers.sameDate(day.Date, monthAgo)) monthAgoPrice = day.Close;
    });

    stock = {
      symbol: historicalDaily[0].Symbol,
      price: price,
      dayAgo: price - dayAgoPrice,
      weekAgo: price - weekAgoPrice,
      monthAgo: price - monthAgoPrice
    }
    return stock;
  }

  return {
    getStocks: getStocks,
    getStock: getStock,
    getFormattedStock: getFormattedStock
  }
}])