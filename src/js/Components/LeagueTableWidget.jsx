import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { widgetModule } from 'kambi-widget-core-library'
import { OutcomeButton } from 'kambi-widget-components'
import Table from './Table/Table'
import TableHeadDesktop from './TableHeadDesktop/TableHeadDesktop'
import TableHeadMobile from './TableHeadMobile/TableHeadMobile'
import PositionIndicator from './Position/Indicator/PositionIndicator'
import TableBody from './TableBody/TableBody'
import TableBodyPositionCell from './TableBodyPositionCell/TableBodyPositionCell'
import TableBodyParticipantCell from './TableBodyParticipantCell/TableBodyParticipantCell'
import TableBodyStatsCell from './TableBodyStatsCell/TableBodyStatsCell'
import TableBodyOutcomeCell from './TableBodyOutcomeCell/TableBodyOutcomeCell'
import TableBodyRow from './TableBodyRow/TableBodyRow'
import Legend from './Legend/Legend'

/**
 * Column labels map
 * @type {{key: string, value: string}[]}
 */
const COLUMNS = [
  {
    key: 'gamesPlayed',
    className: 'games-played',
    name: 'Games Played',
    short: 'P',
  },
  { key: 'wins', className: 'wins', name: 'Wins', short: 'W' },
  { key: 'draws', className: 'draws', name: 'Draws', short: 'D' },
  { key: 'losses', className: 'losses', name: 'Losses', short: 'L' },
  { key: 'goalsFor', className: 'goals-for', name: 'Goals for', short: 'Gf' },
  {
    key: 'goalsAgainst',
    className: 'goals-against',
    name: 'Goals against',
    short: 'Ga',
  },
  {
    key: 'goalsDifference',
    className: 'goals-difference',
    name: 'Difference',
    short: '+/-',
  },
  { key: 'points', className: 'points', name: 'Points', short: 'Pts' },
]

/**
 * Determines if mobile layout should be used.
 * @returns {boolean}
 */
const isMobile = function() {
  return window.innerWidth < 481
}

class LeagueTableWidget extends Component {
  /**
   * Widget constructor
   * @param {object} props Widget properties
   */
  constructor(props) {
    super(props)

    this.state = {
      columnGroupIdx: 0,
      mobile: isMobile(),
    }

    this.updateDimensions = this.updateDimensions.bind(this)
  }

  /**
   * Called after mounting widget.
   */
  componentDidMount() {
    widgetModule.adaptWidgetHeight()
    window.addEventListener('resize', this.updateDimensions)
  }

  /**
   * Called before properties change.
   * @param {object} nextProps New properties
   */
  componentWillReceiveProps(nextProps) {
    this.columnGroupsCache = null
  }

  /**
   * Called just after finished rendering DOM.
   */
  componentDidUpdate() {
    widgetModule.adaptWidgetHeight()
  }

  /**
   * Called just before removing the component.
   */
  componentWillUnmount() {
    window.removeEventListener('resize', this.updateDimensions)
  }

  /**
   * Returns current column group definitions.
   * @returns {object.<string, object>}
   */
  get columnGroups() {
    return (
      this.columnGroupsCache ||
      (this.columnGroupsCache = [
        {
          id: 'statistics',
          title: 'Statistics',
          columns: COLUMNS.filter(column => {
            if (!isMobile()) {
              return true
            }

            return ['goalsFor', 'goalsAgainst'].indexOf(column.key) < 0
          }),
          render: function(row) {
            return this.columns.map(column => (
              <TableBodyStatsCell
                key={column.key}
                column={column}
                value={row[column.key]}
              />
            ))
          },
        },
        {
          id: 'outcomes',
          title: 'Bet offers',
          columns: this.props.betOffers.map(betOffer => {
            return {
              key: '',
              className: 'outcome',
              name: betOffer.betOfferType.name,
              short: betOffer.betOfferType.name,
            }
          }),
          render: row => {
            return row.outcomes.map((outcome, i) => (
              <TableBodyOutcomeCell key={i}>
                {outcome && (
                  <OutcomeButton
                    event={this.props.event}
                    outcome={outcome}
                    label={false}
                    updateOdds={true}
                  />
                )}
              </TableBodyOutcomeCell>
            ))
          },
        },
      ])
    )
  }

  /**
   * Returns currently selected group definition (for mobile layout).
   * @returns {Object}
   */
  get columnGroup() {
    return this.columnGroups[this.state.columnGroupIdx]
  }

  /**
   * Handles selection of different column group (mobile layout).
   * @param {number} idx Column group index
   */
  columnGroupChanged(idx) {
    this.setState({ columnGroupIdx: idx })
  }

  /**
   * Updates widget layout on container resize.
   */
  updateDimensions() {
    const mobile = isMobile()

    if (this.state.mobile != mobile) {
      this.columnGroupsCache = null
      this.setState({ mobile: mobile })
    }
  }

  /**
   * Renders widget.
   * @returns {XML}
   */
  render() {
    return (
      <div>
        <Table>
          {!this.state.mobile && (
            <TableHeadDesktop
              title={this.props.title}
              columns={this.columnGroups.reduce(
                (names, columnGroup) => names.concat(columnGroup.columns),
                []
              )}
            />
          )}
          {this.state.mobile && (
            <TableHeadMobile
              title={this.props.title}
              showColumnPicker={this.props.betOffers.length > 0}
              columnGroups={this.columnGroups}
              initialColumnGroupIdx={this.state.columnGroupIdx}
              onColumnGroupChanged={this.columnGroupChanged.bind(this)}
            />
          )}
          <TableBody>
            {this.props.statistics.map((row, i) => (
              <TableBodyRow key={`pos_${i}`}>
                <TableBodyPositionCell>
                  <PositionIndicator
                    position={row.position}
                    color={this.props.positionColorMatcher(row.position)}
                    change={0}
                  />
                </TableBodyPositionCell>
                <TableBodyParticipantCell name={row.participantName} />
                {this.state.mobile
                  ? this.columnGroup.render(row)
                  : this.columnGroups.map(columnGroup =>
                      columnGroup.render(row)
                    )}
              </TableBodyRow>
            ))}
          </TableBody>
        </Table>
        {!!this.props.positionLegend.length && (
          <Legend items={this.props.positionLegend} />
        )}
      </div>
    )
  }
}

LeagueTableWidget.propTypes = {
  /**
   * Statistics table
   */
  statistics: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * BetOffers list
   */
  betOffers: PropTypes.arrayOf(PropTypes.object).isRequired,

  /**
   * Title of the widget
   */
  title: PropTypes.string.isRequired,

  /**
   * Position color legend
   */
  positionLegend: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ),

  /**
   * Function which maps team position to circle color (accepted by Circle element)
   */
  positionColorMatcher: PropTypes.func,
}

LeagueTableWidget.defaultProps = {
  positionLegend: [],
  positionColorMatcher: () => 'TRANSPARENT',
}

export default LeagueTableWidget
