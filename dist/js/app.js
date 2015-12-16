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

!function(){"use strict";function e(e,t,n,r){e.apiConfigSet=!1,e.appArgsSet=!1,e.oddsFormat="decimal",e.defaultHeight=350,e.currentHeight=350,e.apiVersion="v2",e.streamingAllowedForPlayer=!1,e.defaultArgs={},e.init=function(){var i=r.defer(),a=e.$on("CLIENT:CONFIG",function(t,r){null!=r.oddsFormat&&e.setOddsFormat(r.oddsFormat),r.version=e.apiVersion,n.setConfig(r),e.apiConfigSet=!0,e.apiConfigSet&&e.appArgsSet&&i.resolve(),a()}),o=e.$on("WIDGET:ARGS",function(t,r){e.setArgs(r),null!=r&&r.hasOwnProperty("offering")&&n.setOffering(r.offering),e.appArgsSet=!0,e.apiConfigSet&&e.appArgsSet&&i.resolve(),o()});return t.setWidgetHeight(e.defaultHeight),t.requestWidgetHeight(),t.enableWidgetTransition(!0),t.requestClientConfig(),t.requestWidgetArgs(),t.requestBetslipOutcomes(),t.requestOddsFormat(),i.promise},e.navigateToLiveEvent=function(e){t.navigateToLiveEvent(e)},e.getWidgetHeight=function(){t.requestWidgetHeight()},e.setWidgetHeight=function(n){e.currentHeight=n,t.setWidgetHeight(n)},e.setWidgetEnableTransition=function(e){t.enableWidgetTransition(e)},e.removeWidget=function(){t.removeWidget()},e.addOutcomeToBetslip=function(e){t.addOutcomeToBetslip(e.id)},e.removeOutcomeFromBetslip=function(e){t.removeOutcomeFromBetslip(e.id)},e.requestBetslipOutcomes=function(){t.requestBetslipOutcomes()},e.requestWidgetArgs=function(){t.requestWidgetArgs()},e.requestPageInfo=function(){t.requestPageInfo()},e.requestOddsFormat=function(){t.requestOddsFormat()},e.setOddsFormat=function(t){e.oddsFormat=t},e.findEvent=function(e,t){for(var n=0,r=e.length;r>n;++n)if(e[n].id===t)return e[n];return null},e.getOutcomeLabel=function(e,t){return n.getOutcomeLabel(e,t)},e.setArgs=function(t){var n=e.defaultArgs;for(var r in t)t.hasOwnProperty(r)&&n.hasOwnProperty(r)&&(n[r]=t[r]);e.args=n},e.setPages=function(t,n,r){var i=r||t.length,a=Math.ceil(i/n),o=0;for(e.pages=[];a>o;++o)e.pages.push({startFrom:n*o,page:o+1})},e.updateBetOfferOutcomes=function(e,t){for(var n=0,r=e.outcomes.length,i=t.length;r>n;++n){var a=0,o=-1;for(e.outcomes[n].selected=!1;i>a;a++)e.outcomes[n].id===t[a].id&&(e.outcomes[n].odds=t[a].odds,o=n),-1!==o&&(e.outcomes[o].selected=!0)}},e.$on("WIDGET:HEIGHT",function(t,n){e.currentHeight=n})}!function(t){return t.controller("widgetCoreController",["$scope","kambiWidgetService","kambiAPIService","$q",e])}(angular.module("widgetCore",[]))}(),function(){"use strict";!function(e){return e.directive("kambiPaginationDirective",[function(){return{restrict:"E",scope:{list:"=list",listLimit:"=",pages:"=",startFrom:"=",activePage:"="},template:'<span ng-class="{disabled:activePage === 1}" ng-if="pages.length > 1" ng-click="pagePrev()" class="kw-page-link kw-pagination-arrow"><i class="ion-ios-arrow-left"></i></span><span ng-if="pages.length > 1" ng-repeat="page in getPagination()" ng-click="setActivePage(page)" ng-class="{active:page === activePage}" class="kw-page-link l-pack-center l-align-center">{{page}}</span><span ng-class="{disabled:activePage === pages.length}" ng-if="pages.length > 1" ng-click="pageNext()" class="kw-page-link kw-pagination-arrow"><i class="ion-ios-arrow-right"></i></span>',controller:["$scope",function(e){e.activePage=1,e.setPage=function(t){e.startFrom=t.startFrom,e.activePage=t.page},e.setActivePage=function(t){e.setPage(e.pages[t-1])},e.pagePrev=function(){e.activePage>1&&e.setPage(e.pages[e.activePage-2])},e.pageNext=function(){e.activePage<e.pages.length&&e.setPage(e.pages[e.activePage])},e.pageCount=function(){return Math.ceil(e.list.length/e.listLimit)},e.getPagination=function(){var t=[],n=5,r=e.activePage,i=e.pageCount(),a=1,o=i;i>n&&(a=Math.max(r-Math.floor(n/2),1),o=a+n-1,o>i&&(o=i,a=o-n+1));for(var s=a;o>=s;s++)t.push(s);return t}}]}}])}(angular.module("widgetCore"))}(),function(){!function(e){"use strict";e.filter("startFrom",function(){return function(e,t){return e?(t=+t,e.slice(t)):[]}})}(angular.module("widgetCore"))}(),function(){"use strict";!function(e){return e.service("kambiAPIService",["$http","$q",function(e,t){var n={};return n.configDefer=t.defer(),n.configSet=!1,n.offeringSet=!1,n.config={apiBaseUrl:null,channelId:null,currency:null,locale:null,market:null,offering:null,clientId:null,version:"v2"},n.setConfig=function(e){for(var t in e)e.hasOwnProperty(t)&&n.config.hasOwnProperty(t)&&(n.config[t]=e[t]);n.config.apiBaseUrl=n.config.apiBaseUrl.replace(/\{apiVersion}/gi,n.config.version),n.configSet=!0,n.configSet&&n.offeringSet&&n.configDefer.resolve()},n.setOffering=function(e){n.config.offering=e,n.offeringSet=!0,n.configSet&&n.offeringSet&&n.configDefer.resolve()},n.getGroupEvents=function(e){var t="/event/group/"+e+".json";return n.doRequest(t)},n.getLiveEvents=function(){var e="/event/live/open.json";return n.doRequest(e)},n.getBetoffersByGroup=function(e,t,r,i,a){var o="/betoffer/main/group/"+e+".json";return n.doRequest(o,{include:"participants"})},n.getGroupById=function(e,t){var r="/group/"+e+".json";return n.doRequest(r,{depth:t})},n.doRequest=function(r,i){return n.configDefer.promise.then(function(){if(null==n.config.offering)return t.reject("The offering has not been set, please provide it in the widget arguments");var a=n.config.apiBaseUrl+n.config.offering+r,o=i||{},s={lang:o.locale||n.config.locale,market:o.market||n.config.market,client_id:o.clientId||n.config.clientId,include:o.include||null,callback:"JSON_CALLBACK"};return e.jsonp(a,{params:s,cache:!1})})},n.getOutcomeLabel=function(e,t){switch(e.type){case"OT_ONE":return t.homeName;case"OT_CROSS":return"Draw";case"OT_TWO":return t.awayName;default:return e.label}},n}])}(angular.module("widgetCore"))}(),function(){"use strict";!function(e){return e.service("kambiWidgetService",["$rootScope","$window","$q",function(e,t,n){var r,i,a={};return t.KambiWidget&&(i=n.defer(),r=i.promise,t.KambiWidget.apiReady=function(e){a.api=e,i.resolve(e)},t.KambiWidget.receiveResponse=function(e){a.handleResponse(e)}),a.handleResponse=function(t){switch(t.type){case a.api.WIDGET_HEIGHT:e.$broadcast("WIDGET:HEIGHT",t.data);break;case a.api.BETSLIP_OUTCOMES:e.$broadcast("OUTCOMES:UPDATE",t.data);break;case a.api.WIDGET_ARGS:e.$broadcast("WIDGET:ARGS",t.data);break;case a.api.PAGE_INFO:e.$broadcast("PAGE:INFO",t.data);break;case a.api.CLIENT_ODDS_FORMAT:e.$broadcast("ODDS:FORMAT",t.data);break;case a.api.CLIENT_CONFIG:e.$broadcast("CLIENT:CONFIG",t.data);break;case a.api.USER_LOGGED_IN:e.$broadcast("USER:LOGGED_IN",t.data)}},a.requestWidgetHeight=function(){var e=n.defer();return r.then(function(e){e.request(e.WIDGET_HEIGHT)}),e.promise},a.setWidgetHeight=function(e){var t=n.defer();return r.then(function(t){t.set(t.WIDGET_HEIGHT,e)}),t.promise},a.enableWidgetTransition=function(e){var t=n.defer();return r.then(function(t){e?t.set(t.WIDGET_ENABLE_TRANSITION):t.set(t.WIDGET_DISABLE_TRANSITION)}),t.promise},a.removeWidget=function(){var e=n.defer();return r.then(function(e){e.remove()}),e.promise},a.navigateToLiveEvent=function(e){var t=n.defer();return r.then(function(t){t.navigateClient("#event/live/"+e)}),t.promise},a.navigateToEvent=function(e){var t=n.defer();return r.then(function(t){t.navigateClient("#event/"+e)}),t.promise},a.navigateToGroup=function(e){var t=n.defer();return r.then(function(t){t.navigateClient("#group/"+e)}),t.promise},a.navigateToLiveEvents=function(){var e=n.defer();return r.then(function(e){e.navigateClient("#events/live")}),e.promise},a.addOutcomeToBetslip=function(e,t,i,a){var o=n.defer();return r.then(function(n){var r=[];angular.isArray(e)?r=e:r.push(e);var o={outcomes:r};null!=t&&(angular.isArray(t)?o.stakes=t:o.stakes=[t]),o.couponType=1===r.length?n.BETSLIP_OUTCOMES_ARGS.TYPE_SINGLE:n.BETSLIP_OUTCOMES_ARGS.TYPE_COMBINATION,o.updateMode="replace"!==i?n.BETSLIP_OUTCOMES_ARGS.UPDATE_APPEND:n.BETSLIP_OUTCOMES_ARGS.UPDATE_REPLACE,null!=a&&(o.source=a),n.set(n.BETSLIP_OUTCOMES,o)}),o.promise},a.removeOutcomeFromBetslip=function(e){var t=n.defer();return r.then(function(t){var n=[];angular.isArray(e)?n=e:n.push(e),t.set(t.BETSLIP_OUTCOMES_REMOVE,{outcomes:n})}),t.promise},a.requestBetslipOutcomes=function(){var e=n.defer();return r.then(function(e){e.request(e.BETSLIP_OUTCOMES)}),e.promise},a.requestPageInfo=function(){var e=n.defer();return r.then(function(e){e.request(e.PAGE_INFO)}),e.promise},a.requestWidgetArgs=function(){var e=n.defer();return r.then(function(e){e.request(e.WIDGET_ARGS)}),e.promise},a.requestClientConfig=function(){var e=n.defer();return r.then(function(e){e.request(e.CLIENT_CONFIG)}),e.promise},a.requestOddsFormat=function(){var e=n.defer();return r.then(function(e){e.request(e.CLIENT_ODDS_FORMAT)}),e.promise},a}])}(angular.module("widgetCore"))}();