(function () {

      'use strict';

      function appController( $scope, $widgetService, $apiService, $controller, $statisticsApi ) {

         // Extend the core controller that takes care of basic setup and common functions
         angular.extend(appController, $controller('widgetCoreController', {
            '$scope': $scope
         }));

         $scope.leagueTableRows = [];

         $scope.columnLabels = {};

         $scope.defaultHeight = 450;

         $scope.calculatedHeight = 0;

         $scope.rowHeight = 45;

         //Get page info
         $widgetService.requestPageInfo();

         /**
          * Get column labels from local file
          */
         $scope.getColumnLabels = function () {
            $scope.columnLabels = {
               'position': 'Pos',
               'participantName': 'Club',
               'gamesPlayed': 'P',
               'wins': 'W',
               'draws': 'D',
               'losses': 'L',
               'goalsFor': 'Gf',
               'goalsAgainst': 'Ga',
               'points': 'Pts'
            };
         };

         /**
          * Get league items
          */
         $scope.getLeagueItems = function ( type ) {

            $scope.getColumnLabels();

            $statisticsApi.getStatistics(type, $scope.filter)
               .then(function successCallback( objResponse ) {
                  if ( objResponse.data && objResponse.data.statistics ) {
                     var i = 0, arrLength = objResponse.data.statistics.length;
                     for ( ; i < arrLength; ++i ) {
                        var statistics = objResponse.data.statistics[i];

                        if ( statistics && statistics.leagueTable ) {
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
            // Fetch League statistics
            $scope.filter = $scope.pageInfo.pageParam;
            $scope.getLeagueItems('leaguetable');
         });

      }

      (function ( $app ) {
         return $app.controller('appController', ['$scope', 'kambiWidgetService', 'kambiAPIService', '$controller', 'kambiStatisticsService',
            appController]);
      })(angular.module('leagueWidget'));

   }

).call(this);
