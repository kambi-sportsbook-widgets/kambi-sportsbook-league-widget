import React, { PropTypes } from 'react';
import styles from './TableHeadDefaultRow.scss';

const TableHeadDefaultRow = ({ title, columnNames }) => {
   return (
      <tr className={styles.general}>
         <th colSpan="2" className="title">{title}</th>
         {columnNames.map((columnName, i) => <th key={i} className="column-name">{columnName}</th>)}
         <th className="margin" />
      </tr>
   );
};

TableHeadDefaultRow.propTypes = {
   title: PropTypes.string,
   columnNames: PropTypes.arrayOf(PropTypes.string).isRequired
};

TableHeadDefaultRow.defaultProps = {
   title: ''
}

export default TableHeadDefaultRow;
