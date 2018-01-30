import React from 'react'
import PropTypes from 'prop-types'
import styles from './PositionCircle.scss'

const COLORS = {
  GREEN: {
    background: `KambiWidget-winPrimaryColor ${styles.dark}`,
    text: 'KambiWidget-winSecondaryColor',
  },
  LIGHT_GREEN: {
    background: `KambiWidget-winPrimaryColor ${styles.light}`,
    text: 'KambiWidget-winSecondaryColor',
  },
  ORANGE: {
    background: `KambiWidget-drawPrimaryColor ${styles.dark}`,
    text: 'KambiWidget-drawSecondaryColor',
  },
  LIGHT_ORANGE: {
    background: `KambiWidget-drawPrimaryColor ${styles.light}`,
    text: 'KambiWidget-drawSecondaryColor',
  },
  RED: {
    background: `KambiWidget-losePrimaryColor ${styles.dark}`,
    text: 'KambiWidget-loseSecondaryColor',
  },
  LIGHT_RED: {
    background: `KambiWidget-losePrimaryColor ${styles.light}`,
    text: 'KambiWidget-loseSecondaryColor',
  },
  TRANSPARENT: {
    background: styles.transparent,
    text: 'KambiWidget-card-text-color',
  },
}

const PositionCircle = ({ color, children }) => {
  let backgroundCss = `${styles.wrapper}`
  let textCss = ''
  if (color == null) {
    color = 'TRANSPARENT'
  }
  backgroundCss += ` ${COLORS[color].background}`
  textCss += ` ${COLORS[color].text}`

  return (
    <span className={backgroundCss}>
      <span className={textCss}>{children}</span>
    </span>
  )
}

PositionCircle.propTypes = {
  /**
   * Current participant position
   */
  color: PropTypes.oneOf(Object.keys(COLORS)),

  /**
   * Optional node te be displayed inside circle
   */
  children: PropTypes.node,
}

PositionCircle.defaultProps = {
  color: null,
}

PositionCircle.COLORS = COLORS

export default PositionCircle
