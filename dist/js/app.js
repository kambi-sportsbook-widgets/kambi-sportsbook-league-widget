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
