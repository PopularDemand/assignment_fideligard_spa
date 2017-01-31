fideligard.factory('transactionService', ['portfolioService', 'helpers', function(portfolioService, helpers) {
  var _transactionsInfo = {
    all: []
  };
  var _id = 1;

  var addTransaction = function(transaction) {
    transaction.id = _id++;
    _transactionsInfo.all.push(transaction);
    _modifyPortfolio(transaction);
  };

  var getInfo = function() {
    return _transactionsInfo;
  };

  var _modifyPortfolio = function(transaction) {
    portfolioService.modify(transaction);
  };

  return {
    addTransaction: addTransaction,
    getInfo: getInfo
  }
}])