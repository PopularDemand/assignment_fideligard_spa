fideligard.controller('DatePickerCtrl', ['$scope', function($scope){
  var _addEventListeners = function addEventListeners() {
    var $dp = $('#date-picker');
    $dp.on('input', function(e) { 
      $('#date-label').css({ left: (e.target.clientWidth - 15) / 364 * e.target.value })
    })
  }

  _addEventListeners();


}]);
