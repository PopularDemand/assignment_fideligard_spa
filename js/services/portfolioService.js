fideligard.factory('portfolioService', ['dateService', 'helpers', function(dateService, helpers) {

  var MILLIS_IN_DAY = 86400000;

  // both have dates as keys
  // initialized in initializeStats
  var _stats = {};
  var _ownedStocks = {};

  var getStats = function(date) {
    date = new Date(date);
    date = helpers.normalizeDate(date);
    return _stats[date];
  };

  var getStocks = function(date) {
    date = new Date(date);
    date = helpers.normalizeDate(date);
    console.log(date)
    return _ownedStocks[date];
  }

  var modify = function(transaction) {
    _adjustCash(transaction);
    _adjustOwnedStocks(transaction);
  };

  var _adjustCash = function(transaction) {
    var date = helpers.normalizeDate(transaction.date);
    var amount = transaction.price;

    if (transaction.type === 'buy') {
      amount = amount * -1
    }
    
    var referenceDate = new Date(date);
    for (day in _stats) {
      var dayAsObj = new Date(day);
      if (referenceDate <= dayAsObj){
        _stats[day].cash += amount;
      }
    }
  };

  var _adjustOwnedStocks = function(transaction) {
    var symbol = transaction.symbol;
    var date = helpers.normalizeDate(transaction.date);
    var amount = transaction.quantity;
    if (transaction.type === 'sell') {
      amount *= -1;
    }

    if (symbol in _ownedStocks[date]) {
      _ownedStocks[date][symbol] += amount;
    } else {
      _ownedStocks[date][symbol] = amount;
    }
  };

  var _initializeStats = function() {
    var date = new Date('01-01-2016');
    for (var i = 0; i < 366; i++) {
      _stats[helpers.normalizeDate(date)] = {
        cash: 100,
        value: 1000000,
        profit: 0,
        dayProfit: 0,
        weekProfit: 0,
        monthProfit: 0
      }

      _ownedStocks[helpers.normalizeDate(date)] = {};

      date = new Date(date.getTime() + MILLIS_IN_DAY);
    }
  };
  _initializeStats();

  return {
    getStats: getStats,
    modify: modify,
    getStocks: getStocks
  }
}])