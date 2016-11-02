import React, { Component } from 'react';
import { coreLibrary, widgetModule, translationModule } from 'kambi-widget-core-library';
import { OutcomeButton } from 'kambi-widget-components';
import styles from './LeagueTableWidget.scss';

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
   {
      key: 'gamesPlayed',
      className: 'games-played',
      name: 'Games Played',
      short: 'P'
   },
   {
      key: 'wins',
      className: 'wins',
      name: 'Wins',
      short: 'W'
   },
   {
      key: 'draws',
      className: 'draws',
      name: 'Draws',
      short: 'D'
   },
   {
      key: 'losses',
      className: 'losses',
      name: 'Losses',
      short: 'L'
   },
   {
      key: 'goalsFor',
      className: 'goals-for',
      name: 'Goals for',
      short: 'Gf'
   },
   {
      key: 'goalsAgainst',
      className: 'goals-against',
      name: 'Goals against',
      short: 'Ga'
   },
   {
      key: 'goalsDifference',
      className: 'goals-difference',
      name: 'Difference',
      short: '+/-'
   },
   {
      key: 'points',
      className: 'points',
      name: 'Points',
      short: 'Pts'
   }
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
    * Called after mounting widget.
    */
   componentDidMount() {
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
      console.warn(this.props.statistics.length);
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
            <table className={styles.table}>
               <thead onClick={this.toggle.bind(this)}>
                  <tr>
                     <th colSpan="2" className="title">
                        {this.title}
                     </th>
                     {COLUMNS.map(column =>
                        <th key={column.key} className={['stats', column.className].join(' ')}>
                           {column.short}
                        </th>
                     )}
                     {this.props.betOffers.map(betOffer =>
                        <th key={betOffer.id} className="outcome">
                           {betOffer.betOfferType.name}
                        </th>
                     )}
                  </tr>
               </thead>
               <tbody>
                  {this.props.statistics.map((row) => {
                     return (
                        <tr key={row.participantId}>
                           <td className="position">
                              <span>{row['position']}</span>
                              {!!Math.round(Math.random()) && <i className={Math.round(Math.random()) ? 'up' : 'down'} />}
                           </td>
                           <td className="participant-name">{row['participantName']}</td>
                           {COLUMNS.map(column =>
                              <td
                                 key={column.key}
                                 title={t(column.name)}
                                 className={['stats', column.className].join(' ')}
                              >
                                 {row[column.key]}
                              </td>
                           )}
                           {row.outcomes.map(outcome =>
                              <td key={outcome.id} className="outcome">
                                 <div className="l-flexbox">
                                    <OutcomeButton outcome={outcome} event={event} />
                                 </div>
                              </td>
                           )}
                        </tr>
                     );
                  })}
               </tbody>
            </table>
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
    * Fixed widget title (if set)
    */
   title: React.PropTypes.string,

   /**
    * Widget tracking name
    */
   widgetTrackingName: React.PropTypes.string
};

export default LeagueTableWidget;
