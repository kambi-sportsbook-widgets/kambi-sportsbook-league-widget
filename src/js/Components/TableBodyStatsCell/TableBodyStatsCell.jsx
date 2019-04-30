import React from 'react'
import PropTypes from 'prop-types'
import { translationModule } from 'kambi-widget-core-library'
import styles from './TableBodyStatsCell.scss'

const t = translationModule.getTranslation.bind(translationModule)

const TableBodyStatsCell = ({ column, value }) => {
  return (
    <td
      title={t(column.name)}
      className={[styles.general, column.className, 'KambiWidget-league-table-statistics-value'].join(' ')}
    >
      {t(value)}
    </td>
  )
}

TableBodyStatsCell.propTypes = {
  /**
   * Statistics column definition
   */
  column: PropTypes.shape({
    name: PropTypes.string.isRequired,
    className: PropTypes.string.isRequired,
  }).isRequired,

  /**
   * Statistics value
   */
  value: PropTypes.number,
}

export default TableBodyStatsCell
