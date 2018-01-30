import React from 'react'
import PropTypes from 'prop-types'
import styles from './PositionIndicator.scss'
import PositionCircle from '../Circle/PositionCircle'

const PositionIndicator = ({ position, color, change }) => {
  return (
    <span>
      <PositionCircle color={color}>{position}</PositionCircle>
      {change !== 0 && (
        <i
          className={[
            styles.triangle,
            change > 0 ? styles.up : styles.down,
          ].join(' ')}
        />
      )}
    </span>
  )
}

PositionIndicator.propTypes = {
  /**
   * Current participant position
   */
  position: PropTypes.number.isRequired,

  /**
   * Participants count
   */
  color: PropTypes.string,

  /**
   * Position change from last statistics publication (positive, negative or 0 number)
   */
  change: PropTypes.number,
}

PositionIndicator.defaultProps = {
  change: 0,
  color: null,
}

export default PositionIndicator
