import React from 'react'
import PropTypes from 'prop-types'
import { translationModule } from 'kambi-widget-core-library'
import styles from './TableBodyPositionCell.scss'

const t = translationModule.getTranslation.bind(translationModule)

const TableBodyPositionCell = ({ children }) => (
  <td className={styles.general} title={t('Position')}>
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
