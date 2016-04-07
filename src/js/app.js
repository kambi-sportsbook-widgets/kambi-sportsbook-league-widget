(function () {
   'use strict';

   var LeagueTable = Stapes.subclass({
      constructor: function () {
         this.scope = {
            args: {
               updatedTime: '',
               headerDefaultTitle: ''
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

               CoreLibrary.widgetModule.setWidgetHeight(450);

               // for testing:
               // CoreLibrary.pageInfo.leaguePaths = ['football/england/premier_league/'];

               if ( CoreLibrary.pageInfo.leaguePaths != null && CoreLibrary.pageInfo.leaguePaths.length === 1 ) {
                  CoreLibrary.statisticsModule
                     .getStatistics('leaguetable', CoreLibrary.pageInfo.leaguePaths[0])
                     .then(function ( data ) {
                        var rows = [], date = new Date(data.updated);
                        data.leagueTableRows.forEach(function ( row ) {
                           row.goalsDifference = row.goalsFor - row.goalsAgainst;
                           rows.push(row);
                        }.bind(this));
                        this.scope.leagueTableRows = rows;
                        this.scope.args.updatedTime = date;

                        // Calculate the height based on the rows plus the header and footer divs
                        var rowHeight = 45;
                        var calculatedHeight = this.scope.leagueTableRows.length * rowHeight + 84;

                        CoreLibrary.widgetModule.setWidgetHeight(calculatedHeight);
                     }.bind(this));
               } else {
                  CoreLibrary.widgetModule.removeWidget();
               }

            }.bind(this))
            .catch(function ( error ) {
               console.debug('init error');
               console.trace(error);
            });

         this.view = rivets.bind(document.getElementById('main'), this.scope);

         this.view.binders['column-header-title'] = function ( el, column ) {
            if ( column.value !== 'Pos' && column.value !== 'participantName' ) {
               el.setAttribute('title', CoreLibrary.translationModule.i18nStrings[column.key]);
            }
         };

         this.view.formatters.tableCell = function ( tableRow, column ) {
            if ( tableRow != null ) {
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
