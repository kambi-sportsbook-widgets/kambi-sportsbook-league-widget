import React from 'react'
import PropTypes from 'prop-types'
import TableHeadDefaultRow from '../TableHeadDefaultRow/TableHeadDefaultRow'

const TableHeadDesktop = ({ columns, title }) => (
  <thead>
    <TableHeadDefaultRow columns={columns} title={title} />
  </thead>
)

TableHeadDesktop.propTypes = {
  /**
   * Widget's title
   */
  title: PropTypes.string.isRequired,

  /**
   * Definitions of column groups
   */
  columns: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      short: PropTypes.string.isRequired,
    })
  ).isRequired,
}

export default TableHeadDesktop
