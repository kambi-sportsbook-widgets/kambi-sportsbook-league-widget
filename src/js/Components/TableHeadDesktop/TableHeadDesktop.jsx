import React, { PropTypes, Component } from 'react';
import TableHeadDefaultRow from '../TableHeadDefaultRow/TableHeadDefaultRow';

const TableHeadDesktop = ({ columns, title, onHeadClick, hiddenMode, collapsable }) => {
   return (
      <thead onClick={onHeadClick}>
         <TableHeadDefaultRow
            columns={columns}
            title={title}
            hiddenMode={hiddenMode}
            collapsable={collapsable}
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

   /**
    * Called on header click
    */
   onHeadClick: PropTypes.func.isRequired,

   /**
    * Should mobile header be displayed in widget's hidden mode?
    */
   hiddenMode: PropTypes.bool,

   /**
    * If true makes the header black background
    */
   collapsable: PropTypes.bool.isRequired
};

TableHeadDesktop.defaultProps = {
   hiddenMode: false
};

export default TableHeadDesktop;
