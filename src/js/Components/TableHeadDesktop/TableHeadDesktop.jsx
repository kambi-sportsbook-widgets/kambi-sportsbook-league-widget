import React, { PropTypes, Component } from 'react';
import TableHeadDefaultRow from '../TableHeadDefaultRow/TableHeadDefaultRow';

const TableHeadDesktop = ({ columnGroups, title, onHeadClick }) => {
   const columnNames = Object.keys(columnGroups)
      .reduce((names, key) => names.concat(columnGroups[key].columns.map(column => column.short)), []);

   return (
      <thead onClick={onHeadClick}>
         <TableHeadDefaultRow columnNames={columnNames} title={title} />
      </thead>
   );
};

TableHeadDesktop.propTypes = {
   title: PropTypes.string.isRequired,
   columnGroups: PropTypes.object.isRequired,
   onHeadClick: PropTypes.func.isRequired
};

export default TableHeadDesktop;
