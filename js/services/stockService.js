fideligard.factory('stockService', ['$http', 'dateService', function($http, dateService) {

  var _stocks = [];
  var MILLIS_IN_DAY = 86400000;
  var formattedStocks;

  var getStocks = function() {
    return $http.get('/data/stocks.json').then(function(response) {
      stocks = response.data.query.results.quote;
      stocks = _.groupBy(stocks, "Symbol");
      formattedStocks = [];
      for (stock in stocks) {
        formattedStocks.push(_formatOneStock(stocks[stock]));
      }
      angular.copy(formattedStocks, _stocks);
      return _stocks;
    })
  };

  var _formatOneStock = function(historicalDaily) {
    var dayAgo, weekAgo, monthAgo,
        price = 'NA', dayAgoPrice = 'NA',
        weekAgoPrice = 'NA', monthAgoPrice = 'NA',
        date = new Date(dateService.get());

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
      if (_sameDate(day.Date, date)) price = day.Close
      if (_sameDate(day.Date, dayAgo)) dayAgoPrice = day.Close;
      if (_sameDate(day.Date, weekAgo)) weekAgoPrice = day.Close;
      if (_sameDate(day.Date, monthAgo)) monthAgoPrice = day.Close;
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

  var _sameDate = function(day, currentDay) {
    return _normalizeDate(day) == _normalizeDate(currentDay)
  }

  // this is only for pre-comparison formatting. do not alter any objs here
  var _normalizeDate = function(date) {
    var d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + (d.getDate() + 1);
  };

  // TODO Not in use
  // var _withinDateRange = function(day, endDate, daysAgo) {
  //   var beginDate = Date.parse(endDate) - daysAgo * MILLIS_IN_DAY;
  //   beginDate = new Date(beginDate);
  //   day = new Date(day);

  //   return day >= beginDate && day <= endDate;
  // }

  return {
    getStocks: getStocks
  }
}])