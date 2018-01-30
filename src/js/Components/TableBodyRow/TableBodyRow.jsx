import React, { Children } from 'react'
import PropTypes from 'prop-types'
import styles from './TableBodyRow.scss'

const TableBodyRow = ({ children }) => (
  <tr className={['KambiWidget-card-inner-border', styles.row].join(' ')}>
    {children}
    <td className="margin" />
  </tr>
)

TableBodyRow.propTypes = {
  /**
   * Inner rows
   */
  children: PropTypes.node,
}

export default TableBodyRow
