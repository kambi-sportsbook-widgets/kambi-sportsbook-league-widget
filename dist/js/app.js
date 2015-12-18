(function () {

   var arrDependencies;

   arrDependencies = [
      'widgetCore',
      'ngAnimate'
   ];

   (function ( $app ) {
      'use strict';
      return $app;
   })(angular.module('leagueWidget', arrDependencies));
}).call(this);



(function () {

   'use strict';

   function appController( $scope, $http, $q, $widgetService, $apiService, $controller ) {

      // Extend the core controller that takes care of basic setup and common functions
      angular.extend(appController, $controller('widgetCoreController', {
         '$scope': $scope
      }));

      $scope.leagueTableRows = [];

      $scope.columnLabels = {};

      $scope.defaultHeight = 450;

      $scope.calculatedHeight = 0;

      $scope.rowHeight = 45;

      /**
       * Get league items
       */
      $scope.getLeagueItems = function () {

         // Temporary call to local file to get the league data.
         $http({
            method: 'GET',
            url: 'ofe_output_v1.json'
         }).then(function successCallback( objResponse ) {
            if ( objResponse.data && objResponse.data.statistics ) {
               var i = 0, arrLength = objResponse.data.statistics.length;
               for ( ; i < arrLength; ++i ) {
                  var statistics = objResponse.data.statistics[i];

                  if ( statistics && statistics.leagueTable ) {
                     $scope.columnLabels = statistics.leagueTable.columnLabels;
                     $scope.leagueTableRows = statistics.leagueTable.leagueTableRows;
                     $scope.calculatedHeight = $scope.leagueTableRows.length * $scope.rowHeight;
                  }
               }

               $scope.setWidgetHeight($scope.calculatedHeight);
            }

         }, function errorCallback( response ) {
         });
      };

      // Call the init method in the coreWidgetController so that we setup everything using our overridden values
      // The init-method returns a promise that resolves when all of the configurations are set, for instance the $scope.args variables
      // so we can call our methods that require parameters from the widget settings after the init method is called
      $scope.init().then(function () {
         // Fetch the live events
         $scope.getLeagueItems();
      });

   }

   (function ( $app ) {
      return $app.controller('appController', ['$scope', '$http', '$q', 'kambiWidgetService', 'kambiAPIService', '$controller', appController]);
   })(angular.module('leagueWidget'));

}).call(this);

!function(){"use strict";function e(t,n,r,i,o){t.apiConfigSet=!1,t.appArgsSet=!1,t.oddsFormat="decimal",t.defaultHeight=350,t.currentHeight=350,t.apiVersion="v2",t.streamingAllowedForPlayer=!1,t.defaultArgs={},t.init=function(){var e=i.defer(),o=t.$on("CLIENT:CONFIG",function(n,i){null!=i.oddsFormat&&t.setOddsFormat(i.oddsFormat),i.version=t.apiVersion,r.setConfig(i),t.apiConfigSet=!0,t.apiConfigSet&&t.appArgsSet&&e.resolve(),o()}),a=t.$on("WIDGET:ARGS",function(n,i){t.setArgs(i),null!=i&&i.hasOwnProperty("offering")&&r.setOffering(i.offering),t.appArgsSet=!0,t.apiConfigSet&&t.appArgsSet&&e.resolve(),a()});return n.setWidgetHeight(t.defaultHeight),n.requestWidgetHeight(),n.enableWidgetTransition(!0),n.requestClientConfig(),n.requestWidgetArgs(),n.requestBetslipOutcomes(),n.requestOddsFormat(),e.promise},t.getConfigValue=function(e){return r.config.hasOwnProperty(e)?r.config[e]:null},t.navigateToLiveEvent=function(e){n.navigateToLiveEvent(e)},t.getWidgetHeight=function(){n.requestWidgetHeight()},t.setWidgetHeight=function(e){t.currentHeight=e,n.setWidgetHeight(e)},t.setWidgetEnableTransition=function(e){n.enableWidgetTransition(e)},t.removeWidget=function(){n.removeWidget()},t.addOutcomeToBetslip=function(e){n.addOutcomeToBetslip(e.id)},t.removeOutcomeFromBetslip=function(e){n.removeOutcomeFromBetslip(e.id)},t.requestBetslipOutcomes=function(){n.requestBetslipOutcomes()},t.requestWidgetArgs=function(){n.requestWidgetArgs()},t.requestPageInfo=function(){n.requestPageInfo()},t.requestOddsFormat=function(){n.requestOddsFormat()},t.setOddsFormat=function(e){t.oddsFormat=e},t.findEvent=function(e,t){for(var n=0,r=e.length;r>n;++n)if(e[n].id===t)return e[n];return null},t.getOutcomeLabel=function(e,t){return r.getOutcomeLabel(e,t)},t.setArgs=function(e){var n=t.defaultArgs;for(var r in e)e.hasOwnProperty(r)&&n.hasOwnProperty(r)&&(n[r]=e[r]);t.args=n},t.setPages=function(e,n,r){var i=r||e.length,o=Math.ceil(i/n),a=0;for(t.pages=[];o>a;++a)t.pages.push({startFrom:n*a,page:a+1})},t.updateBetOfferOutcomes=function(e,t){for(var n=0,r=e.outcomes.length,i=t.length;r>n;++n){var o=0,a=-1;for(e.outcomes[n].selected=!1;i>o;o++)e.outcomes[n].id===t[o].id&&(e.outcomes[n].odds=t[o].odds,a=n),-1!==a&&(e.outcomes[a].selected=!0)}};try{angular.module("widgetCore.translate"),angular.extend(e,o("translateController",{$scope:t}))}catch(a){}t.$on("WIDGET:HEIGHT",function(e,n){t.currentHeight=n})}!function(t){return t.controller("widgetCoreController",["$scope","kambiWidgetService","kambiAPIService","$q","$controller",e])}(angular.module("widgetCore",[]))}(),function(){"use strict";!function(e){return e.directive("kambiPaginationDirective",[function(){return{restrict:"E",scope:{list:"=list",listLimit:"=",pages:"=",startFrom:"=",activePage:"="},template:'<span ng-class="{disabled:activePage === 1}" ng-if="pages.length > 1" ng-click="pagePrev()" class="kw-page-link kw-pagination-arrow"><i class="ion-ios-arrow-left"></i></span><span ng-if="pages.length > 1" ng-repeat="page in getPagination()" ng-click="setActivePage(page)" ng-class="{active:page === activePage}" class="kw-page-link l-pack-center l-align-center">{{page}}</span><span ng-class="{disabled:activePage === pages.length}" ng-if="pages.length > 1" ng-click="pageNext()" class="kw-page-link kw-pagination-arrow"><i class="ion-ios-arrow-right"></i></span>',controller:["$scope",function(e){e.activePage=1,e.setPage=function(t){e.startFrom=t.startFrom,e.activePage=t.page},e.setActivePage=function(t){e.setPage(e.pages[t-1])},e.pagePrev=function(){e.activePage>1&&e.setPage(e.pages[e.activePage-2])},e.pageNext=function(){e.activePage<e.pages.length&&e.setPage(e.pages[e.activePage])},e.pageCount=function(){return Math.ceil(e.list.length/e.listLimit)},e.getPagination=function(){var t=[],n=5,r=e.activePage,i=e.pageCount(),o=1,a=i;i>n&&(o=Math.max(r-Math.floor(n/2),1),a=o+n-1,a>i&&(a=i,o=a-n+1));for(var s=o;a>=s;s++)t.push(s);return t}}]}}])}(angular.module("widgetCore"))}(),function(){!function(e){"use strict";e.filter("startFrom",function(){return function(e,t){return e?(t=+t,e.slice(t)):[]}})}(angular.module("widgetCore"))}(),function(){"use strict";!function(e){return e.service("kambiAPIService",["$http","$q","$rootScope",function(e,t,n){var r={};return r.configDefer=t.defer(),r.configSet=!1,r.offeringSet=!1,r.config={apiBaseUrl:null,channelId:null,currency:null,locale:null,market:null,offering:null,clientId:null,version:"v2"},r.setConfig=function(e){for(var t in e)if(e.hasOwnProperty(t)&&r.config.hasOwnProperty(t))switch(r.config[t]=e[t],t){case"locale":n.$broadcast("LOCALE:CHANGE",e[t])}r.config.apiBaseUrl=r.config.apiBaseUrl.replace(/\{apiVersion}/gi,r.config.version),r.configSet=!0,r.configSet&&r.offeringSet&&r.configDefer.resolve()},r.setOffering=function(e){r.config.offering=e,r.offeringSet=!0,r.configSet&&r.offeringSet&&r.configDefer.resolve()},r.getGroupEvents=function(e){var t="/event/group/"+e+".json";return r.doRequest(t)},r.getLiveEvents=function(){var e="/event/live/open.json";return r.doRequest(e)},r.getBetoffersByGroup=function(e,t,n,i,o){var a="/betoffer/main/group/"+e+".json";return r.doRequest(a,{include:"participants"})},r.getGroupById=function(e,t){var n="/group/"+e+".json";return r.doRequest(n,{depth:t})},r.doRequest=function(n,i){return r.configDefer.promise.then(function(){if(null==r.config.offering)return t.reject("The offering has not been set, please provide it in the widget arguments");var o=r.config.apiBaseUrl+r.config.offering+n,a=i||{},s={lang:a.locale||r.config.locale,market:a.market||r.config.market,client_id:a.clientId||r.config.clientId,include:a.include||null,callback:"JSON_CALLBACK"};return e.jsonp(o,{params:s,cache:!1})})},r.getOutcomeLabel=function(e,t){switch(e.type){case"OT_ONE":return t.homeName;case"OT_CROSS":return"Draw";case"OT_TWO":return t.awayName;default:return e.label}},r}])}(angular.module("widgetCore"))}(),function(){"use strict";!function(e){return e.service("kambiWidgetService",["$rootScope","$window","$q",function(e,t,n){var r,i,o={};return t.KambiWidget&&(i=n.defer(),r=i.promise,t.KambiWidget.apiReady=function(e){o.api=e,i.resolve(e)},t.KambiWidget.receiveResponse=function(e){o.handleResponse(e)}),o.handleResponse=function(t){switch(t.type){case o.api.WIDGET_HEIGHT:e.$broadcast("WIDGET:HEIGHT",t.data);break;case o.api.BETSLIP_OUTCOMES:e.$broadcast("OUTCOMES:UPDATE",t.data);break;case o.api.WIDGET_ARGS:e.$broadcast("WIDGET:ARGS",t.data);break;case o.api.PAGE_INFO:e.$broadcast("PAGE:INFO",t.data);break;case o.api.CLIENT_ODDS_FORMAT:e.$broadcast("ODDS:FORMAT",t.data);break;case o.api.CLIENT_CONFIG:e.$broadcast("CLIENT:CONFIG",t.data);break;case o.api.USER_LOGGED_IN:e.$broadcast("USER:LOGGED_IN",t.data)}},o.requestWidgetHeight=function(){var e=n.defer();return r.then(function(e){e.request(e.WIDGET_HEIGHT)}),e.promise},o.setWidgetHeight=function(e){var t=n.defer();return r.then(function(t){t.set(t.WIDGET_HEIGHT,e)}),t.promise},o.enableWidgetTransition=function(e){var t=n.defer();return r.then(function(t){e?t.set(t.WIDGET_ENABLE_TRANSITION):t.set(t.WIDGET_DISABLE_TRANSITION)}),t.promise},o.removeWidget=function(){var e=n.defer();return r.then(function(e){e.remove()}),e.promise},o.navigateToLiveEvent=function(e){var t=n.defer();return r.then(function(t){t.navigateClient("#event/live/"+e)}),t.promise},o.navigateToEvent=function(e){var t=n.defer();return r.then(function(t){t.navigateClient("#event/"+e)}),t.promise},o.navigateToGroup=function(e){var t=n.defer();return r.then(function(t){t.navigateClient("#group/"+e)}),t.promise},o.navigateToLiveEvents=function(){var e=n.defer();return r.then(function(e){e.navigateClient("#events/live")}),e.promise},o.addOutcomeToBetslip=function(e,t,i,o){var a=n.defer();return r.then(function(n){var r=[];angular.isArray(e)?r=e:r.push(e);var a={outcomes:r};null!=t&&(angular.isArray(t)?a.stakes=t:a.stakes=[t]),a.couponType=1===r.length?n.BETSLIP_OUTCOMES_ARGS.TYPE_SINGLE:n.BETSLIP_OUTCOMES_ARGS.TYPE_COMBINATION,a.updateMode="replace"!==i?n.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND:n.BETSLIP_OUTCOMES_ARGS.UPDATE_REPLACE,null!=o&&(a.source=o),n.set(n.BETSLIP_OUTCOMES,a)}),a.promise},o.removeOutcomeFromBetslip=function(e){var t=n.defer();return r.then(function(t){var n=[];angular.isArray(e)?n=e:n.push(e),t.set(t.BETSLIP_OUTCOMES_REMOVE,{outcomes:n})}),t.promise},o.requestBetslipOutcomes=function(){var e=n.defer();return r.then(function(e){e.request(e.BETSLIP_OUTCOMES)}),e.promise},o.requestPageInfo=function(){var e=n.defer();return r.then(function(e){e.request(e.PAGE_INFO)}),e.promise},o.requestWidgetArgs=function(){var e=n.defer();return r.then(function(e){e.request(e.WIDGET_ARGS)}),e.promise},o.requestClientConfig=function(){var e=n.defer();return r.then(function(e){e.request(e.CLIENT_CONFIG)}),e.promise},o.requestOddsFormat=function(){var e=n.defer();return r.then(function(e){e.request(e.CLIENT_ODDS_FORMAT)}),e.promise},o}])}(angular.module("widgetCore"))}();