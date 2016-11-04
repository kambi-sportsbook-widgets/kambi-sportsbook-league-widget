import React, { PropTypes, Component } from 'react';
import TableHeadDefaultRow from '../TableHeadDefaultRow/TableHeadDefaultRow';

const TableHeadDesktop = ({ columnGroups, title, onHeadClick, hiddenMode }) => {
   const columnNames = Object.keys(columnGroups)
      .reduce((names, key) => names.concat(columnGroups[key].columns.map(column => column.short)), []);

   return (
      <thead onClick={onHeadClick}>
         <TableHeadDefaultRow columnNames={columnNames} title={title} hiddenMode={hiddenMode} />
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
   columnGroups: PropTypes.object.isRequired,

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
