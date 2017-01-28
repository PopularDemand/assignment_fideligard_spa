fideligard.factory('dateService', function() {
  var _date =  new Date('2016-01-01')

  var get = function(){
    return _date
  }

  var getDateAsStep = function(start, end, numberSteps){
    start = start || new Date('2016-01-01');
    end = end || new Date('2016-12-31');
    numberSteps = numberSteps || 364;
    if(_date < start) return 1;
    if(_date > end) return numberSteps + 1;

    return Math.floor((numberSteps/(end - start)) * ( _date - start))
  }

  var setDateFromStep = function(step, start, end, numberSteps){
    start = start || new Date('2016-01-01');
    end = end || new Date('2016-12-31');
    numberSteps = numberSteps || 364;

    var millisDate = (((end - start)/numberSteps) * step) + start.getTime();

    _date.setTime(millisDate)
    
    return _date
  }

  return {
    get: get,
    getDateAsStep: getDateAsStep,
    setDateFromStep: setDateFromStep
  }
});
