fideligard.controller('DatePickerCtrl', ['$scope', 'dateService', function($scope, dateService){

  $scope.dateInfo = dateService.get();

  $scope.setDate = function(e) {
    $dp = $('#date-picker');
    $dl = $('#date-label');
    $dl.css({ left: $dp.width() * ($scope.dateValue / 364) - $dl.width() / 2})
    dateService.setDateFromStep($scope.dateValue);
  }

  var _addEventListeners = function() {
    var $dp = $('#date-picker');
    $dp.on('input', $scope.setDate);
  };
  _addEventListeners();

  var _initializeValues =function() {
    $dp = $('#date-picker');
    $dl = $('#date-label');
    $scope.dateValue = dateService.getDateAsStep();
    $dl.css({ left: $dp.width() * ($scope.dateValue / 364) - $dl.width() / 2})
  }
  _initializeValues();

  // $scope.getScope = function() {
  //   console.log( $scope );
  // }

}]);
