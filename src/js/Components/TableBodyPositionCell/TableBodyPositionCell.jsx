import React from 'react'
import PropTypes from 'prop-types'
import { translationModule } from 'kambi-widget-core-library'
import styles from './TableBodyPositionCell.scss'

const t = translationModule.getTranslation.bind(translationModule)

let cssClasses = [
  'KambiWidget-card-support-text-color',
  styles.general
]

cssClasses = cssClasses.join(' ')

const TableBodyPositionCell = ({ children }) => (
  <td className={cssClasses} title={t('Position')}>
    {children}
  </td>
)

TableBodyPositionCell.propTypes = {
  /**
   * Inner element - PositionIndicator
   */
  children: PropTypes.element.isRequired,
}

export default TableBodyPositionCell
