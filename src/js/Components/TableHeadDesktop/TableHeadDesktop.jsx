import React, { PropTypes, Component } from 'react';
import TableHeadDefaultRow from '../TableHeadDefaultRow/TableHeadDefaultRow';

const TableHeadDesktop = ({ columns, title, hiddenMode }) => {
   return (
      <thead>
         <TableHeadDefaultRow
            columns={columns}
            title={title}
         />
      </thead>
   );
};

TableHeadDesktop.propTypes = {
   /**
    * Widget's title
    */
   title: PropTypes.string.isRequired,

   /**
    * Definitions of column groups
    */
   columns: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      short: PropTypes.string.isRequired
   })).isRequired,
};

export default TableHeadDesktop;
