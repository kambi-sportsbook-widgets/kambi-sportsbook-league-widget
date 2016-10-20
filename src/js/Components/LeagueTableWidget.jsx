import React, { Component } from 'react';
import { coreLibrary, widgetModule, translationModule } from 'widget-core-library';
import TableHead from './TableHead';
import TableHeadColumn from './TableHeadColumn';
import TableHeadOutcomeColumn from './TableHeadOutcomeColumn';
import TableBody from './TableBody';
import TableBodyRow from './TableBodyRow';
import TableBodyCell from './TableBodyCell';
import TableBodyOutcomeCell from './TableBodyOutcomeCell';

/**
 * Widget header height
 * @type {number}
 */
const HEADER_HEIGHT = 59;

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

      coreLibrary.setWidgetTrackingName(props.widgetTrackingName);
      widgetModule.enableWidgetTransition(true);

      this.state = {
         hidden: false
      };
   }

   /**
    * Called before mounting widget.
    */
   componentWillMount() {
      widgetModule.adaptWidgetHeight();
   }

   /**
    * Called before properties change.
    * @param {object} nextProps New properties
    */
   componentWillReceiveProps(nextProps) {
      coreLibrary.setWidgetTrackingName(nextProps.widgetTrackingName);
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
    * Returns proper widget title.
    * @returns {string}
    */
   get title() {
      if (this.props.title) {
         return this.props.title;
      }

      if (this.props.event) {
         const path = this.props.event.event.path;

         if (path.length >= 3) {
            return path[2].name;
         } else if (path.length >= 1) {
            return path[0].name;
         }
      }

      return '';
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
      const t = translationModule.getTranslation.bind(translationModule);

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
            <TableHead onClick={this.toggle.bind(this)}>
               {COLUMNS.map(
                  (column, i) => <TableHeadColumn
                     key={column.key}
                     handle={column.key}
                     title={['position', 'participantName'].indexOf(column.key) < 0 ? t(column.key) : ''}
                     value={i > 0 ? t(column.value) : this.title}
                  />
               )}
               {this.props.betOffers.map(
                  betOffer => <TableHeadOutcomeColumn key={betOffer.id} title={betOffer.betOfferType.name} />
               )}
            </TableHead>
            <TableBody updated={this.props.updated}>
               {this.props.statistics.map((row) => {
                  return (
                     <TableBodyRow key={row.participantId}>
                        {COLUMNS.map(
                           column => <TableBodyCell key={column.key} handle={column.key} title={t(column.key)} value={row[column.key]} />
                        )}
                        {row.outcomes.map(
                           outcome => <TableBodyOutcomeCell key={outcome.id} outcome={outcome} event={this.props.event} />
                        )}
                     </TableBodyRow>
                  );
               })}
            </TableBody>
         </div>
      );
   }
}

LeagueTableWidget.propTypes = {
   /**
    * Statistics table
    */
   statistics: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

   /**
    * BetOffers list
    */
   betOffers: React.PropTypes.arrayOf(React.PropTypes.object).isRequired,

   /**
    * Optional event entity
    */
   event: React.PropTypes.object,

   /**
    * Statistics updated date time
    */
   updated: React.PropTypes.instanceOf(Date).isRequired,

   /**
    * Fixed widget title (if set)
    */
   title: React.PropTypes.string,

   /**
    * Widget tracking name
    */
   widgetTrackingName: React.PropTypes.string
};

export default LeagueTableWidget;
