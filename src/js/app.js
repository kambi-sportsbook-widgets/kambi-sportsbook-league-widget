(function () {
   'use strict';

   var LeagueTable = CoreLibrary.Component.subclass({
      defaultArgs: {
         updatedTime: '',
         title: null,
         filter: null // if null will use oreLibrary.pageInfo.leaguePaths
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

         let filter;

         // for testing:
         // filter = 'football/england/premier_league/';
         if (this.scope.args.filter != null) {
            filter = this.scope.args.filter;
         } else if ( CoreLibrary.pageInfo.leaguePaths != null && CoreLibrary.pageInfo.leaguePaths.length === 1 ) {
            filter = CoreLibrary.pageInfo.leaguePaths[0];
         } else {
            CoreLibrary.widgetModule.removeWidget();
         }

         if (this.scope.args.title == null) {
            // getting the title from the offering api
            CoreLibrary.offeringModule.getEventsByFilter(filter)
               .then((response) => {
                  if (Array.isArray(response.events) &&
                        response.events.length > 0 &&
                        Array.isArray(response.events[0].event.path)) {
                     let path = response.events[0].event.path;
                     if (path.length >= 3) {
                        this.scope.title = path[2].name;
                     } else if (path.length >= 1) {
                        this.scope.title = path[0].name;
                     }
                     // rerenders the header
                     this.getColumnLabels();
                  }
               });
         } else {
            this.scope.title = this.scope.args.title;
         }
         CoreLibrary.statisticsModule
            .getStatistics('leaguetable', filter)
            .then(( data ) => {
               const rows = [], date = new Date(data.updated);
               data.leagueTableRows.forEach(( row ) => {
                  row.goalsDifference = row.goalsFor - row.goalsAgainst;
                  rows.push(row);
               });
               this.scope.leagueTableRows = rows;
               this.scope.args.updatedTime = date;

               // Calculate the height based on the rows plus the header and footer divs
               const rowHeight = 45;
               const calculatedHeight = this.scope.leagueTableRows.length * rowHeight + 59 + 45;

               CoreLibrary.widgetModule.setWidgetHeight(calculatedHeight);
            });
      },

      getColumnLabels () {
         // forces rerender when this function is invoked
         this.scope.columnLabels = null;
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
