fideligard.factory('stockService', ['$http', 'dateService', function($http, dateService) {

  var _stocks;
  var MILLIS_IN_DAY = 86400000;

  var getStocks = function() {
    return $http.get('/data/stocks.json').then(function(response) {
      _stocks = response.data.query.results.quote;
      return _stocks;
    })
  }

  // use date from date service to determine what data to get for 1, 7, 30day
  //{"Symbol":"AAPL","Date":"2014-12-30","Open":"113.639999",
  // "High":"113.919998","Low":"112.110001","Close":"112.519997",
  // "Volume":"29881500","Adj_Close":"108.227002"}
  var _formatOneStock = function(historicalDaily) {
    var pastDay = [],
    pastWeek = [],
    pastMonth = [],
    date = dateService.get();

    historicalDaily.forEach(function(day) {
      if (_sameDate(day.Date, date)) { 
        console.log('here')
        pastDay.push(day)
      }
    })
    console.log(pastDay)
  }

  var _sameDate = function(day, currentDay) {
    console.log('stock day', _normalizeDate(day))
    console.log('currentDay', _normalizeDate(currentDay))
    return _normalizeDate(day) == _normalizeDate(currentDay)
  }

  // this is only for pre-comparison formatting. do not alter any objs here
  var _normalizeDate = function(date) {
    var d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + (d.getDate() + 1);
  };

  return {
    getStocks: getStocks,
    formatOneStock: _formatOneStock
  }
}])