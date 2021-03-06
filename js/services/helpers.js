fideligard.factory('helpers', function() {
  
  var sameDate = function(day, currentDay) {
    return normalizeDate(day) == normalizeDate(currentDay)
  }

  var normalizeDate = function(date) {
    var d = new Date(date);
    return d.getFullYear() + '-' + (d.getMonth()+1) + '-' + (d.getDate() + 1);
  };

  // TODO Not in use
  // var _withinDateRange = function(day, endDate, daysAgo) {
  //   var beginDate = Date.parse(endDate) - daysAgo * MILLIS_IN_DAY;
  //   beginDate = new Date(beginDate);
  //   day = new Date(day);

  //   return day >= beginDate && day <= endDate;
  // }

  return {
    sameDate: sameDate,
    normalizeDate: normalizeDate
  }
})