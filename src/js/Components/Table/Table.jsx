import React from 'react'
import PropTypes from 'prop-types'
import styles from './Table.scss'

const Table = ({ children }) => {
  return (
    <table
      className={[
        'KambiWidget-card-background-color KambiWidget-primary-text-color',
        styles.general,
      ].join(' ')}
    >
      {children}
    </table>
  )
}

Table.propTypes = {
  /**
   * Inner elements
   */
  children: PropTypes.node,
}

export default Table
