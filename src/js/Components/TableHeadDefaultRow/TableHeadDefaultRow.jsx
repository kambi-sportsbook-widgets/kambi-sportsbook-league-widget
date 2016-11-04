import React, { PropTypes } from 'react';
import styles from './TableHeadDefaultRow.scss';

const TableHeadDefaultRow = ({ title, columnNames, hiddenMode }) => {
   return (
      <tr className={styles.general}>
         <th colSpan="2" className="title">{title}</th>
         {columnNames.map((columnName, i) => <th key={i} className="column-name">{hiddenMode ? '' : columnName}</th>)}
         <th className="margin" />
      </tr>
   );
};

TableHeadDefaultRow.propTypes = {
   /**
    * Widget's title
    */
   title: PropTypes.string,

   /**
    * Statistics and/or outcomes column names to be displayed
    */
   columnNames: PropTypes.arrayOf(PropTypes.string).isRequired,

   /**
    * Should mobile header be displayed in widget's hidden mode?
    */
   hiddenMode: PropTypes.bool
};

TableHeadDefaultRow.defaultProps = {
   title: '',
   hiddenMode: false
};

export default TableHeadDefaultRow;
