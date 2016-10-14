import React, { Component } from 'react';
import { coreLibrary, offeringModule, widgetModule, statisticsModule } from 'widget-core-library';
import TableHeader from './TableHeader';
import TableBody from './TableBody';

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
const COLUMNS = [
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

   /**
    * Widget constructor
    * @param {object} props Widget properties
    */
   constructor(props) {
      super(props);

      coreLibrary.setWidgetTrackingName(props.args.widgetTrackingName);
      widgetModule.enableWidgetTransition(true);
      widgetModule.setWidgetHeight(DEFAULT_HEIGHT);

      this.state = {
         participants: [],
         betOffers: [],
         hidden: false
      };
   }

   /**
    * Called before mounting widget.
    */
   componentWillMount() {
      this.refresh();
   }

   /**
    * Called on property change.
    */
   componentWillReceiveProps() {
      this.refresh();
   }

   /**
    * Called just after finished rendering DOM.
    */
   componentDidUpdate() {
      if (this.state.hidden) {
         widgetModule.setWidgetHeight(HEADER_HEIGHT);
      } else {
         widgetModule.adaptWidgetHeight();
      }
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

         for (let i = parts.length; i < 4; i++) {
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
            if (!event) {
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

   /**
    * Fetches data from the server and updates state.
    */
   refresh() {
      const filter = this.filter;

      if (filter === null) {
         widgetModule.removeWidget();
      }

      Promise.all([
         this.getCompetitionEvent(filter),
         statisticsModule.getLeagueTableStatistics(filter)
      ])
      .then(([event, statistics]) => {
         const criterionId = parseInt(this.props.args.criterionId, 10);

         // don't look for bet offers if criterion identifier is not set
         const betOffers = Number.isNaN(criterionId) ? []
            : event.betOffers.filter(bo => bo.criterion.id === this.props.args.criterionId);

         this.setState({
            title: this.getTitle(event),
            updated: (new Date(statistics.updated)).toString(),
            event: event,
            betOffers: betOffers,
            participants: statistics.leagueTableRows.map((row) => {
               row.goalsDifference = row.goalsFor - row.goalsAgainst;
               row.outcomes = betOffers.map(bo => bo.outcomes.find(oc => oc.participantId === row.participantId));
               return row;
            })
         });
      })
      .catch((error) => {
         console.error(error);
         widgetModule.removeWidget();
      });
   }

   /**
    * Hides or show widget.
    */
   toggle() {
      this.setState({ hidden: !this.state.hidden });
   }

   /**
    * Renders widget.
    * @returns {XML}
    */
   render() {
      const classList = [
         'kw-card',
         'KambiWidget-card-background-color',
         'KambiWidget-card-text-color',
         'l-flexbox',
         'l-vertical',
         'l-expander'
      ];

      if (this.state.hidden) {
         classList.push('hidden');
      }

      return (
         <div className={classList.join(' ')}>
            <TableHeader
               betOffers={this.state.betOffers}
               columns={COLUMNS}
               title={this.state.title}
               onClick={this.toggle.bind(this)}
            />
            <TableBody
               columns={COLUMNS}
               event={this.state.event}
               participants={this.state.participants}
               updated={this.state.updated}
            />
         </div>
      );
   }
}

LeagueTableWidget.propTypes = {
   /**
    * Widget arguments
    */
   args: React.PropTypes.object.isRequired
};

export default LeagueTableWidget;
