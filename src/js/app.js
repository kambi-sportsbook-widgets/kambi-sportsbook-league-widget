(function () {
   'use strict';

   var LeagueTable = CoreLibrary.Component.subclass({
      defaultArgs: {
         updatedTime: '',
         headerDefaultTitle: ''
      },

      constructor () {
         CoreLibrary.Component.apply(this, arguments);
      },

      init () {
         this.scope.leagueTableRows = [];

         this.view.binders['column-header-title'] = function ( el, column ) {
            if ( column.value !== 'Pos' && column.value !== 'participantName' ) {
               el.setAttribute('title', CoreLibrary.translationModule.i18nStrings[column.key]);
            }
         };

         this.view.formatters.tableCell = function ( tableRow, column ) {
            if ( tableRow != null ) {
               return tableRow[column.key];
            }
         };

         this.getColumnLabels();

         CoreLibrary.widgetModule.enableWidgetTransition(true);

         CoreLibrary.widgetModule.setWidgetHeight(450);

         // for testing:
         // CoreLibrary.pageInfo.leaguePaths = ['football/england/premier_league/'];

         if ( CoreLibrary.pageInfo.leaguePaths != null && CoreLibrary.pageInfo.leaguePaths.length === 1 ) {
            CoreLibrary.statisticsModule
               .getStatistics('leaguetable', CoreLibrary.pageInfo.leaguePaths[0])
               .then(( data ) => {
                  var rows = [], date = new Date(data.updated);
                  data.leagueTableRows.forEach(( row ) => {
                     row.goalsDifference = row.goalsFor - row.goalsAgainst;
                     rows.push(row);
                  });
                  this.scope.leagueTableRows = rows;
                  this.scope.args.updatedTime = date;

                  // Calculate the height based on the rows plus the header and footer divs
                  var rowHeight = 45;
                  var calculatedHeight = this.scope.leagueTableRows.length * rowHeight + 59 + 45;

                  CoreLibrary.widgetModule.setWidgetHeight(calculatedHeight);
               });
         } else {
            CoreLibrary.widgetModule.removeWidget();
         }

      },

      getColumnLabels () {
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

   var leagueTable = new LeagueTable({
      rootElement: 'html'
   });

})();
