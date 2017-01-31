fideligard.factory('transactionService', [function() {
  var _transactionsInfo = {
    all: []
  };
  var _id = 1;

  var addTransaction = function(transaction) {
    transaction.id = _id++;
    _transactionsInfo.all.push(transaction);
    console.log(_transactionsInfo)
  };

  var getInfo = function() {
    return _transactionsInfo;
  };

  return {
    addTransaction: addTransaction,
    getInfo: getInfo
  }
}])