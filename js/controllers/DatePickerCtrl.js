fideligard.controller('DatePickerCtrl', ['$scope', 'dateService', function($scope, dateService){
  var _addEventListeners = function addEventListeners() {
    var $dp = $('#date-picker');
    $dp.on('input', function(e) {
      $('#date-label').css({ left: (e.target.clientWidth - 15) / 364 * e.target.value })
    })
  }

  _addEventListeners();


}]);
