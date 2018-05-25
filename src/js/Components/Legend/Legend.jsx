import React from 'react'
import PropTypes from 'prop-types'
import { translationModule } from 'kambi-widget-core-library'
import styles from './Legend.scss'
import PositionCircle from '../Position/Circle/PositionCircle'

const t = translationModule.getTranslation.bind(translationModule)
/**
 * Removes duplicate legends based on matching descriptions
 */
const Legend = ({ items }) => {
  items = items.filter(
    (item, i, arr) =>
      i === arr.findIndex(t => t.description === item.description)
  )

  return (
    <ul className={styles.legend}>
      {items.map((item, i) => (
        <li key={i}>
          <div className={styles.circle}>
            <PositionCircle color={item.color} />
          </div>
          <p>{t(item.description)}</p>
        </li>
      ))}
    </ul>
  )
}

Legend.propTypes = {
  /**
   * Array of legend items
   */
  items: PropTypes.arrayOf(
    PropTypes.shape({
      color: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default Legend
