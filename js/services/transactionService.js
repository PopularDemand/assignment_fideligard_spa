fideligard.factory('transactionService', ['portfolioService', 'helpers', function(portfolioService, helpers) {
  var _transactionsInfo = {
    all: []
  };
  var _id = 1;

  var addTransaction = function(transaction) {
    var valid = _validate(transaction);
    if (valid) {
      transaction.id = _id++;
      _transactionsInfo.all.push(transaction);
      _modifyPortfolio(transaction);
    }
  };

  var getInfo = function() {
    return _transactionsInfo;
  };

  var _validate = function(transaction) {
    var _portfolioStats = portfolioService.getStats(transaction.date);
    if (transaction.type === 'buy') {
      return _portfolioStats.cash >= transaction.price;
    } else {
      var stocks = portfolioService.getStocks(transaction.date);
      return (transaction.symbol in stocks && stocks[transaction.symbol] >= transaction.quantity)
    }
  }

  var _modifyPortfolio = function(transaction) {
    portfolioService.modify(transaction);
  }

  return {
    addTransaction: addTransaction,
    getInfo: getInfo
  }
}])