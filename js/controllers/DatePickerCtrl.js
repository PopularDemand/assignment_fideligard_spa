fideligard.controller('DatePickerCtrl', ['$scope', 'dateService', function($scope, dateService){
  var _addEventListeners = function() {
    var $dp = $('#date-picker');
    $dp.on('input', function(e) {
      $('#date-label').css({ left: (e.target.clientWidth - 45) / 364 * $scope.dateValue})
      dateService.setDateFromStep($scope.dateValue);
    });
  };

  var _initializeValues =function() {
    $dp = $('#date-picker');
    $scope.dateValue = dateService.getDateAsStep();
    $('#date-label').css({ left: ($dp.clientWidth - 45) / 364 * $dp.value })
  }

  $scope.getScope = function() {
    console.log( $scope );
  }

  $scope.dateInfo = dateService.get();
  // $scope.$watch('$scope.date', function(e){
  //   console.log("changed", e);
  // })

  _addEventListeners();
  _initializeValues();

}]);
