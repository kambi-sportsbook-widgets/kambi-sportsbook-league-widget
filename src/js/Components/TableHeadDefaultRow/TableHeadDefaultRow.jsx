import React from 'react'
import PropTypes from 'prop-types'
import { translationModule } from 'kambi-widget-core-library'
import styles from './TableHeadDefaultRow.scss'

const t = translationModule.getTranslation.bind(translationModule)

const TableHeadDefaultRow = ({ title, columns, hiddenMode }) => {
  const headerClasses = [
    'KambiWidget-card-header-border',
    'KambiWidget-secondary-header',
    'KambiWidget-card-support-text-color',
    styles.general,
  ].join(' ')

  const titleClasses = [
    styles.title,
    'KambiWidget-league-table-league-name',
  ].join(' ')

  const columnClasses = [
    styles['column-name'],
    'KambiWidget-league-table-header-text',
  ].join(' ')

  return (
    <tr className={headerClasses}>
      <th colSpan="2" className={titleClasses}>
        {title}
      </th>
      {columns.map((column, i) => (
        <th key={i} className={columnClasses} title={t(column.short)}>
          {hiddenMode ? '' : t(column.short)}
        </th>
      ))}
      <th className={styles.margin} />
    </tr>
  )
}

TableHeadDefaultRow.propTypes = {
  /**
   * Widget's title
   */
  title: PropTypes.string,

  /**
   * Statistics and/or outcomes columns to be displayed
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      short: PropTypes.string.isRequired,
    })
  ).isRequired,

  /**
   * Should mobile header be displayed in widget's hidden mode?
   */
  hiddenMode: PropTypes.bool,
}

TableHeadDefaultRow.defaultProps = {
  title: '',
  hiddenMode: false,
}

export default TableHeadDefaultRow
