import React, { Component } from 'react';
import { coreLibrary, offeringModule, widgetModule, statisticsModule } from 'widget-core-library';
import { OutcomeComponent } from 'widget-components';

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
 * @type {{key: string, value: string}[]}
 */
const COLUMN_LABELS = [
   { key: 'position', value: 'Pos' },
   { key: 'participantName', value: 'Club' },
   { key: 'gamesPlayed', value: 'P' },
   { key: 'wins', value: 'W' },
   { key: 'draws', value: 'D' },
   { key: 'losses', value: 'L' },
   { key: 'goalsFor', value: 'Gf' },
   { key: 'goalsAgainst', value: 'Ga' },
   { key: 'goalsDifference', value: '+/-' },
   { key: 'points', value: 'Pts' }
];

class LeagueTableWidget extends Component {

   constructor(props) {
      super(props);

      coreLibrary.setWidgetTrackingName(props.args.widgetTrackingName);
      widgetModule.enableWidgetTransition(true);
      widgetModule.setWidgetHeight(DEFAULT_HEIGHT);

      this.state = {
         participants: [],
         betOffers: []
      };
   }

   componentWillMount() {
      this.refresh();
   }

   /**
    * Fetches competition event for given filter and criterion identifier.
    * @param {String} filter
    * @returns {Promise.<Object>}
    */
   getCompetitionEvent(filter) {
      const criterionId = parseInt(this.props.args.criterionId, 10);

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
      return offeringModule.getEventsByFilter(competitionsFilter)
         .then((response) => {
            if (!response || !Array.isArray(response.events)) {
               throw new Error('Invalid response from Kambi API');
            }

            // if criterion identifier is not set just find first event which is a competition
            if (Number.isNaN(criterionId)) {
               return response.events.find(ev => ev.event.type === 'ET_COMPETITION');
            }

            // search for event which is a competition and has a betOffer with given criterion identifier
            return response.events.find((ev) => {
               return ev.event.type === 'ET_COMPETITION' &&
                  ev.betOffers.find(bo => bo.criterion.id === criterionId);
            });
         })
         .then((event) => {
            if (event === null) {
               throw new Error(`Competition not found for filter=${filter} and criterionId=${criterionId}`);
            }

            // following request will respond with all betOffers
            return offeringModule.getEvent(event.event.id);
         })
         .then((event) => {
            if (event === null) {
               throw new Error('Event not found');
            }

            return event;
         });
   }

   /**
    * Returns proper widget title.
    * @param {object} event Fetched event object
    * @returns {string}
    */
   getTitle(event) {
      if (this.props.args.title) {
         return this.props.args.title;
      }

      const path = event.event.path;

      if (path.length >= 3) {
         return path[2].name;
      } else if (path.length >= 1) {
         return path[0].name;
      }
   }

   /**
    * Returns events filter.
    * @returns {string|null}
    */
   get filter() {
      if (this.props.args.filter != null) {
         return this.props.args.filter;
      }

      if ( coreLibrary.pageInfo.leaguePaths != null && coreLibrary.pageInfo.leaguePaths.length === 1 ) {
         return coreLibrary.pageInfo.leaguePaths[0];
      }

      return null;
   }

   refresh() {
      const filter = this.filter;

      if (filter === null) {
         widgetModule.removeWidget();
      }

      Promise.all([
         this.getCompetitionEvent(filter),
         statisticsModule.getLeagueTableStatistics(filter)
      ]).then(([event, statistics]) => {
         const criterionId = parseInt(this.scope.args.criterionId, 10);

         // don't look for bet offers if criterion identifier is not set
         const betOffers = Number.isNaN(criterionId) ? []
            : event.betOffers.filter(bo => bo.criterion.id === this.scope.args.criterionId);

         this.setState({
            title: this.getTitle(event),
            updated: new Date(statistics.updated),
            event: event,
            betOffers: betOffers,
            participants: statistics.leagueTableRows.map((row) => {
               row.goalsDifference = row.goalsFor - row.goalsAgainst;
               row.outcomes = betOffers.map(bo => bo.outcomes.find(oc => oc.participantId === row.participantId));
               return row;
            })
         });

         // recalculate and update widget height
         widgetModule.adaptWidgetHeight(); /* @todo not sure if this works */
      });
   }

   toggle() {
      /* @todo make this work */
      if (this.hidden) {
         widgetModule.adaptWidgetHeight();
         document.getElementById('main').classList.remove('hidden');
      } else {
         widgetModule.setWidgetHeight(HEADER_HEIGHT);
         document.getElementById('main').classList.add('hidden');
      }

      this.hidden = !this.hidden;
   }

   render() {
      return (
         <div id="main" className="kw-card KambiWidget-card-background-color KambiWidget-card-text-color l-flexbox l-vertical l-expander">
            <header
               className="KambiWidget-header KambiWidget-font KambiWidget-card-border-color l-flexbox l-horizontal l-pl-16 l-pr-16 l-pt-12 l-pb-12 l-mb-12"
               onClick={this.toggle.bind(this)}
            >
               {
                  COLUMN_LABELS.map((column, i) => {
                     return (
                        <div className="l-flex-1 text-truncate">
                           <span>{i > 0 ? column.value /* @todo translate */ : this.state.title}</span>
                        </div>
                     );
                  })
               }
               {
                  this.state.betOffers.map((betOffer) => {
                     return (
                        <div className="l-ml-6 l-flex-2 text-truncate" title={betOffer.betOfferType.name}>
                           {betOffer.betOfferType.name}
                        </div>
                     );
                  })
               }
            </header>
            <main className="KambiWidget-font l-flexbox l-vertical l-flexed l-pack-start">
               {
                  this.state.participants.map((row) => {
                     return (
                        <div className="kw-table-item KambiWidget-card-border-color KambiWidget-card-background-color--hoverable l-flexbox l-horizontal l-align-center l-pl-16 l-pr-16 l-pt-6 l-pb-6">
                           {
                              COLUMN_LABELS.map((column) => {
                                 return (
                                    <div title={column.key} /* @todo translate */ className="l-flex-1 text-truncate">
                                       {row ? row[column.key] : null}
                                    </div>
                                 );
                              })
                           }
                           {
                              row.outcomes.map((outcome) => {
                                 /* @todo add class */
                                 /* @todo resolve data-attr */
                                 return <OutcomeComponent outcome={outcome} event={this.state.event} />
                              })
                           }
                        </div>
                     );
                  })
               }
               <div className="kw-table-item l-flexbox l-align-center l-pl-16 l-pr-16 l-pt-6 l-pb-6">Last updated: {this.state.updated}</div>
            </main>
         </div>
      );
   }
}

LeagueTableWidget.propTypes = {
   args: React.PropTypes.object.isRequired
};

export default LeagueTableWidget;
