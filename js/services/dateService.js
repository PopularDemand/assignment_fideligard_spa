fideligard.factory('dateService', function() {
  var _dateInfo = {
    date: new Date('2016-01-01')
  }

  var get = function(){
    return _dateInfo
  }

  var getDateAsStep = function(start, end, numberSteps){
    start = start || new Date('2016-01-01');
    end = end || new Date('2016-12-31');
    numberSteps = numberSteps || 364;

    if(_dateInfo.date < start) return 1;
    if(_dateInfo.date > end) return numberSteps + 1;

    return Math.floor((numberSteps/(end - start)) * ( _dateInfo.date - start))
  }

  var setDateFromStep = function(step, start, end, numberSteps){
    start = start || new Date('2016-01-01');
    end = end || new Date('2016-12-31');
    numberSteps = numberSteps || 364;

    var millisDate = (((end - start)/numberSteps) * step) + start.getTime();
    var testDate = _dateInfo.date;

    _dateInfo.date.setTime(millisDate)
    
    console.log(testDate === _dateInfo.date)
    console.log("_dateInfo.date is", _dateInfo.date)
    return _dateInfo
  }

  return {
    get: get,
    getDateAsStep: getDateAsStep,
    setDateFromStep: setDateFromStep
  }
});
