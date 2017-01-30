fideligard.factory('helpers', function() {
  
  var sameDate = function(day, currentDay) {
    return _normalizeDate(day) == _normalizeDate(currentDay)
  }

  var _normalizeDate = function(date) {
    var d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + (d.getDate() + 1);
  };

  return {
    sameDate: sameDate,
    _normalizeDate: _normalizeDate
  }
})