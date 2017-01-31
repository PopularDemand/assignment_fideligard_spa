var fideligard = angular.module('fideligard', ['ui.router'])

fideligard.config(['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider){
    $urlRouterProvider.otherwise('portfolio');

    $stateProvider
    .state('index', {
      url: '/',
      abstract: true,
      views: {
        'date-picker@': {
          templateUrl: 'js/templates/date-picker.html',
          controller: 'DatePickerCtrl'
        },
        'stock-panel@': {
          templateUrl: 'js/templates/stock-panel.html',
          controller: 'StockPanelCtrl'
        }
      }
    })
    .state('index.portfolio', {
      url: 'portfolio',
      views: {
        'main-panel@': {
          controller: 'PortfolioCtrl',
          templateUrl: 'js/templates/portfolio.html'
        }
      }})
    .state('index.transactions', {
      url: 'transactions',
      views: {
        'main-panel@': {
          controller: 'TransactionCtrl',
          templateUrl: 'js/templates/transactions.html'
        }
      }
    })
    .state('index.trade', {
      url: 'trade/:symbol',
      views: {
        'main-panel@': {
          controller: 'TradeCtrl',
          templateUrl: 'js/templates/trade.html'
        },
      }
    })
}]);

fideligard.run(function($rootScope){
  $rootScope.$on("$stateChangeError", console.log.bind(console));
});