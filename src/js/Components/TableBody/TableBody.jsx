import React from 'react'
import PropTypes from 'prop-types'

const TableBody = ({ children }) => <tbody>{children}</tbody>

TableBody.propTypes = {
  /**
   * Inner rows
   */
  children: PropTypes.node,
}

export default TableBody
