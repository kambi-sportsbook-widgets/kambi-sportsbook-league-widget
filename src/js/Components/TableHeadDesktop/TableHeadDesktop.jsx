import React, { PropTypes, Component } from 'react';
import TableHeadDefaultRow from '../TableHeadDefaultRow/TableHeadDefaultRow';

const TableHeadDesktop = ({ columns, title, onHeadClick, hiddenMode }) => {
   return (
      <thead onClick={onHeadClick}>
         <TableHeadDefaultRow columns={columns} title={title} hiddenMode={hiddenMode} />
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

   /**
    * Called on header click
    */
   onHeadClick: PropTypes.func.isRequired,

   /**
    * Should mobile header be displayed in widget's hidden mode?
    */
   hiddenMode: PropTypes.bool
};

TableHeadDesktop.defaultProps = {
   hiddenMode: false
};

export default TableHeadDesktop;
