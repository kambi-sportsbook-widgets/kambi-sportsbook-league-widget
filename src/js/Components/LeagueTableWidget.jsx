import React, { Component } from 'react';
import { coreLibrary, widgetModule, translationModule } from 'kambi-widget-core-library';
import { OutcomeButton } from 'kambi-widget-components';
import TableHeadDesktop from './TableHeadDesktop/TableHeadDesktop';
import TableHeadMobile from './TableHeadMobile/TableHeadMobile';
import PositionIndicator from './PositionIndicator/PositionIndicator';
import TableBody from './TableBody/TableBody';
import TableBodyPositionCell from './TableBodyPositionCell/TableBodyPositionCell';
import TableBodyParticipantCell from './TableBodyParticipantCell/TableBodyParticipantCell';
import TableBodyStatsCell from './TableBodyStatsCell/TableBodyStatsCell';
import TableBodyOutcomeCell from './TableBodyOutcomeCell/TableBodyOutcomeCell';
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
         hidden: false,
         columnGroup: Object.keys(this.columnGroups)[0]
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
      this.columnGroupsCache = null;
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

   get columnGroups() {
      return this.columnGroupsCache || (this.columnGroupsCache = {
         statistics: {
            title: 'Statistics',
            columns: COLUMNS,
            render: function(row) {
               return this.columns.map(column =>
                  <TableBodyStatsCell key={column.key} column={column} value={row[column.key]} />
               );
            }
         },
         outcomes: {
            title: 'Outcomes',
            columns: this.props.betOffers.map((betOffer) => {
               return {
                  key: '',
                  className: 'outcome',
                  name: betOffer.betOfferType.name,
                  short: betOffer.betOfferType.name
               };
            }),
            render: function(row) {
               return row.outcomes.map(outcome =>
                  <TableBodyOutcomeCell key={outcome.id}>
                     <OutcomeButton outcome={outcome} event={event} />
                  </TableBodyOutcomeCell>
               )
            }
         }
      });
   }

   get columnGroup() {
      return this.columnGroups[this.state.columnGroup];
   }

   /**
    * Hides or show widget.
    */
   toggle() {
      this.setState({ hidden: !this.state.hidden });
   }

   columnsChanged(columnGroupKey) {
      this.setState({
         columnGroup: columnGroupKey
      });
   }

   /**
    * Renders widget.
    * @returns {XML}
    */
   render() {
      // const t = translationModule.getTranslation.bind(translationModule);
      /*
       <TableHeadMobile
       title={this.title}
       columnGroups={this.columnGroups}
       defaultColumnGroup={this.state.columnGroup}
       onHeadClick={this.toggle.bind(this)}
       onColumnsChanged={this.columnsChanged.bind(this)}
       />
       */

      return (
         <table className={styles.table}>
            <TableHeadDesktop
               title={this.title}
               columnGroups={this.columnGroups}
               onHeadClick={this.toggle.bind(this)}
            />
            <TableBody>
               {this.props.statistics.map((row, i) => [
                  <TableBodyPositionCell key={`pos_${i}`}>
                     <PositionIndicator
                        position={row.position}
                        count={this.props.statistics.length}
                        change={Math.round(Math.random() * 2) - 1}
                     />
                  </TableBodyPositionCell>,
                  <TableBodyParticipantCell key={`par_${i}`} name={row.participantName} />,
                  // this.columnGroup.render(row)
                  Object.keys(this.columnGroups).map(key => this.columnGroups[key].render(row))
               ])}
            </TableBody>
         </table>
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
