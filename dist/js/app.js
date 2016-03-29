(function () {
   'use strict';

   var LeagueTable = Stapes.subclass({
      constructor: function ( name ) {
         this.scope = {
            args: {
               updatedTime: '08:00 GMT',
               headerDefaultTitle: 'Premier League 2015/2016'
            },
            leagueTableRows: []
         };
         this.getColumnLabels();

         CoreLibrary.init()
            .then(function ( widgetArgs ) {
               Object.keys(widgetArgs).forEach(function ( key ) {
                  this.scope.args[key] = widgetArgs[key];
               }.bind(this));

               CoreLibrary.widgetModule.enableWidgetTransition(true);

               if (CoreLibrary.config.offering == null) {
                  CoreLibrary.config.offering = 'ub';
               }

               CoreLibrary.widgetModule.setWidgetHeight(450);

               // for testing:
               CoreLibrary.pageInfo.pageParam = 'football/england/premier_league/';

               CoreLibrary.statisticsModule
                  .getStatistics('leaguetable', CoreLibrary.pageInfo.pageParam)
                  .then(function (data) {
                     var rows = [];
                     data.leagueTableRows.forEach(function (row) {
                        row.goalsDifference = row.goalsFor - row.goalsAgainst;
                        rows.push(row);
                     }.bind(this));
                     this.scope.leagueTableRows = rows;
                     var rowHeight = 45;
                     var calculatedHeight = this.scope.leagueTableRows.length * rowHeight;
                     CoreLibrary.widgetModule.setWidgetHeight(calculatedHeight);
                  }.bind(this));
            }.bind(this))
            .catch(function ( error ) {
               void 0;
               void 0;
            });

         this.view = rivets.bind(document.getElementById('main'), this.scope);

         this.view.binders['column-header-title'] = function ( el, column ) {
            if (column.value !== 'Pos' && column.value !== 'participantName') {
               el.setAttribute('title', CoreLibrary.translationModule.i18nStrings[column.key]);
            }
         };

         this.view.formatters.tableCell = function (tableRow, column) {
            if (tableRow != null) {
               return tableRow[column.key];
            }
         }.bind(this);
      },

      getColumnLabels: function () {
         this.scope.columnLabels = [
            {
               key: 'position',
               value: 'Pos'
            }, {
               key: 'participantName',
               value: 'Club'
            }, {
               key: 'gamesPlayed',
               value: 'P'
            }, {
               key: 'wins',
               value: 'W'
            }, {
               key: 'draws',
               value: 'D'
            }, {
               key: 'losses',
               value: 'L'
            }, {
               key: 'goalsFor',
               value: 'Gf'
            }, {
               key: 'goalsAgainst',
               value: 'Ga'
            }, {
               key: 'goalsDifference',
               value: '+/-'
            }, {
               key: 'points',
               value: 'Pts'
            }
         ];
      }
   });

   var leagueTable = new LeagueTable();

})();

(function () {

   'use strict';

   function appController ( $scope, $widgetService, $apiService, $controller, $statisticsApi ) {

      // Extend the core controller that takes care of basic setup and common functions
      angular.extend(appController, $controller('widgetCoreController', {
            '$scope': $scope
         }));

      $scope.leagueTableRows = [];

      $scope.columnLabels = {};

      $scope.defaultHeight = 450;

      $scope.calculatedHeight = 0;

      $scope.rowHeight = 45;

      $scope.defaultArgs = {
            updatedTime: '08:00 GMT',
            style: '',
            headerDefaultTitle: 'Premier League 2015/2016'
         };

      /**
       * Get column labels from local file
       */
      $scope.getColumnLabels = function () {
            $scope.columnLabels = [
               {
                  key: 'position',
                  value: 'Pos'
               }, {
                  key: 'participantName',
                  value: 'Club'
               }, {
                  key: 'gamesPlayed',
                  value: 'P'
               }, {
                  key: 'wins',
                  value: 'W'
               }, {
                  key: 'draws',
                  value: 'D'
               }, {
                  key: 'losses',
                  value: 'L'
               }, {
                  key: 'goalsFor',
                  value: 'Gf'
               }, {
                  key: 'goalsAgainst',
                  value: 'Ga'
               }, {
                  key: 'goalsDifference',
                  value: '+/-'
               }, {
                  key: 'points',
                  value: 'Pts'
               }
            ];
         };

      /**
       * Get league items
       */
      $scope.getLeagueItems = function ( type ) {

         $scope.getColumnLabels();
         // For testing:
         // $scope.filter = 'football/england/premier_league/';
         $statisticsApi.getStatistics(type, $scope.filter)
               .then(function successCallback ( objResponse ) {
                  if ( objResponse.data && objResponse.data.statistics ) {
                     var i = 0, arrLength = objResponse.data.statistics.length;
                     for ( ; i < arrLength; ++i ) {
                        var statistics = objResponse.data.statistics[i];

                        if ( statistics && statistics.leagueTable ) {
                           $scope.leagueTableRows = statistics.leagueTable.leagueTableRows;
                           for ( var j = 0; j < $scope.leagueTableRows.length; ++j ) {
                              var row = $scope.leagueTableRows[j];
                              row.goalsDifference = row.goalsFor - row.goalsAgainst;
                           }
                           $scope.calculatedHeight = $scope.leagueTableRows.length * $scope.rowHeight;
                        }
                     }

                     $scope.setWidgetHeight($scope.calculatedHeight);
                  }

               }, function errorCallback ( response ) {
                  void 0;
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
