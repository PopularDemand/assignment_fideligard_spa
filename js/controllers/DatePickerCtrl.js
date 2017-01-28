fideligard.controller('DatePickerCtrl', ['$scope', 'dateService', function($scope, dateService){
  var _addEventListeners = function addEventListeners() {
    var $dp = $('#date-picker');
    $dp.on('input', function(e) {
      $('#date-label').css({ left: (e.target.clientWidth - 15) / 364 * e.target.value });
      dateService.setDateFromStep(e.target.value);
      console.log("scope date after update", $scope.dateInfo)
    });
  };

  var _initializeValues =function() {
    $dp = $('#date-picker');
    $dp.val(dateService.getDateAsStep());
    $('#date-label').css({ left: ($dp.clientWidth - 15) / 364 * $dp.value })
  }

  $scope.dateInfo = dateService.get();
  // $scope.$watch('$scope.date', function(e){
  //   console.log("changed", e);
  // })

  _addEventListeners();
  _initializeValues();

}]);
