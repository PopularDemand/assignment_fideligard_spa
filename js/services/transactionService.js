fideligard.factory('transactionService', [function() {
  var _transactions = [];
  var _id = 1;

  var addTransaction = function(transaction) {
    transaction.id = _id++;
    _transactions.push(transaction);
    console.log(_transactions)
  };

  var getAll = function() {
    return _transactions;
  };

  return {
    addTransaction: addTransaction,
    getAll: getAll
  }
}])