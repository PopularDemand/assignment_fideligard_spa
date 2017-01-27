fideligard.controller('DatePickerCtrl', ['$scope', function($scope){
  var _addEventListeners = function addEventListeners() {
    var $dp = $('#date-picker');
    $dp.on('mousedown', function(e) { $scope.dragging = true; })
       .on('mouseup', function(e) { $scope.dragging = false; })
  }

  _addEventListeners();


}]);
