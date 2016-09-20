(function () {
   'use strict';

   /**
    * Widget header height
    * @type {number}
    */
   const HEADER_HEIGHT = 59;

   /**
    * Widget default height
    * @type {number}
    */
   const DEFAULT_HEIGHT = 450;

   /**
    * Column labels map
    * @type {Object[]}
    */
   const COLUMN_LABELS = [
      {key: 'position', value: 'Pos'},
      {key: 'participantName', value: 'Club'},
      {key: 'gamesPlayed', value: 'P'},
      {key: 'wins', value: 'W'},
      {key: 'draws', value: 'D'},
      {key: 'losses', value: 'L'},
      {key: 'goalsFor', value: 'Gf'},
      {key: 'goalsAgainst', value: 'Ga'},
      {key: 'goalsDifference', value: '+/-'},
      {key: 'points', value: 'Pts'}
   ];

   const LeagueTable = CoreLibrary.Component.subclass({
      defaultArgs: {
         filter: null, // if null will use CoreLibrary.pageInfo.leaguePaths
         criterionId: null,
         updatedTime: '',
         title: null,
         widgetTrackingName: 'gm-league-table-widget'
      },

      constructor () {
         CoreLibrary.Component.apply(this, arguments);
      },

      /**
       * Returns events filter.
       * @returns {string}
       */
      getFilter () {
         if (this.scope.args.filter != null) {
            return this.scope.args.filter;
         }

         if ( CoreLibrary.pageInfo.leaguePaths != null && CoreLibrary.pageInfo.leaguePaths.length === 1 ) {
            return CoreLibrary.pageInfo.leaguePaths[0];
         }

         return null;
      },

      /**
       * Returns proper widget title.
       * @param {object} event Fetched event object
       * @returns {string}
       */
      getTitle (event) {
         if (this.scope.args.title) {
            return this.scope.args.title;
         }

         const path = event.event.path;

         if (path.length >= 3) {
            return path[2].name;
         } else if (path.length >= 1) {
            return path[0].name;
         }
      },

      /**
       * Fetches competition event for given filter and criterion identifier.
       * @param {String} filter
       * @returns {Promise.<Object>}
       */
      getCompetitionEvent (filter) {
         const criterionId = parseInt(this.scope.args.criterionId);

         // modify filter to match only competitions
         const competitionsFilter = (() => {
            const parts = filter.split('/').filter(termKey => !!termKey);

            for (let i = 0; i < 4 - parts.length; i++) {
               parts.push('all');
            }

            parts.push('competitions');

            return parts.join('/');
         })();

         // fetch competitions for previously prepared filter
         return CoreLibrary.offeringModule.getEventsByFilter(competitionsFilter)
            .then(response => {
               if (!response || !Array.isArray(response.events)) {
                  throw new Error('Invalid response from Kambi API');
               }

               // if criterion identifier is not set just find first event which is a competition
               if (Number.isNaN(criterionId)) {
                  return response.events.find((ev) => ev.event.type === 'ET_COMPETITION');
               }

               // search for event which is a competition and has a betOffer with given criterion identifier
               return response.events.find((ev) => {
                  return ev.event.type === 'ET_COMPETITION' &&
                     ev.betOffers.find((bo) => bo.criterion.id === criterionId);
               });
            })
            .then(event => {
               if (event === null) {
                  throw new Error(`Competition not found for filter=${filter} and criterionId=${criterionId}`);
               }

               // following request will respond with all betOffers
               return CoreLibrary.offeringModule.getEvent(event.event.id);
            })
            .then(event => {
               if (event === null) {
                  throw new Error('Event not found');
               }

               return event;
            });
      },

      init () {
         CoreLibrary.setWidgetTrackingName(this.scope.args.widgetTrackingName);
         CoreLibrary.widgetModule.enableWidgetTransition(true);
         CoreLibrary.widgetModule.setWidgetHeight(DEFAULT_HEIGHT);

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

         this.scope.columnLabels = COLUMN_LABELS;

         this.scope.toggle = () => {
            if (!!this.hidden) {
               CoreLibrary.widgetModule.adaptWidgetHeight();
               document.getElementById('main').classList.remove('hidden');
            } else {
               CoreLibrary.widgetModule.setWidgetHeight(HEADER_HEIGHT);
               document.getElementById('main').classList.add('hidden');
            }

            this.hidden = !this.hidden;
         };

         const filter = this.getFilter();

         if (filter === null) {
            CoreLibrary.widgetModule.removeWidget();
         }

         Promise.all([
            this.getCompetitionEvent(filter),
            CoreLibrary.statisticsModule.getLeagueTableStatistics(filter)
         ]).then(([event, statistics]) => {
            const criterionId = parseInt(this.scope.args.criterionId);

            // don't look for bet offers if criterion identifier is not set
            const betOffers = Number.isNaN(criterionId) ? []
               : event.betOffers.filter(bo => bo.criterion.id === this.scope.args.criterionId);

            this.scope.title = this.getTitle(event);
            this.scope.updated = new Date(statistics.updated);
            this.scope.event = event;
            this.scope.betOffers = betOffers;
            this.scope.participants = statistics.leagueTableRows.map(row => {
               row.goalsDifference = row.goalsFor - row.goalsAgainst;
               row.outcomes = betOffers.map(bo => bo.outcomes.find(oc => oc.participantId === row.participantId));
               return row;
            });

            // re-render column titles
            this.scope.columnLabels = [];
            this.scope.columnLabels = COLUMN_LABELS;

            // recalculate and update widget height
            CoreLibrary.widgetModule.adaptWidgetHeight();

            this.scope.loaded = true;
         });
      }
   });

   const leagueTable = new LeagueTable({
      rootElement: 'html'
   });

})();
