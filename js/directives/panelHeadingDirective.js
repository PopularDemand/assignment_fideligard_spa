fideligard.directive('panelHeading', ['$state', '_', function($state, _) {

  var determineDefault = function(currentPage, options) {
    for(var i = 0; i < options.length; i++) {
      if (options[i].name === currentPage) return options[i].sref;
    }
  };

  return {
    restrict: 'E',
    scope: {
      'selected': '='
    },
    templateUrl: '/js/directives/panel-heading.html',
    link: function(scope) {
      scope.contentOptions = [
        { name: 'trade', sref: 'index.trade' },
        { name: 'transactions', sref: 'index.transactions' },
        { name: 'portfolio', sref: 'index.portfolio' }
      ];
      
      scope.selectedContent = determineDefault(scope.selected, scope.contentOptions);
      
      scope.redirect = function() {
        $state.go(scope.selectedContent);
      }

      scope.capitalize = function(words) {
        return _.capitalize(words)
      }
    }
  }
}])