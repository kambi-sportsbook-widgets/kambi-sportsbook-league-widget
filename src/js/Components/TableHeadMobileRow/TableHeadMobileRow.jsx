import React, { PropTypes } from 'react';
import styles from './TableHeadMobileRow.scss';

const TableHeadMobileRow = ({ title, colSpan, children }) => {
   return (
      <tr className={styles.general}>
         <th colSpan="2" className="title">{title}</th>
         <th colSpan={colSpan} className="column-picker">
            {children}
         </th>
         <th className="margin" />
      </tr>
   );
};

TableHeadMobileRow.propTypes = {
   title: PropTypes.string.isRequired,
   colSpan: PropTypes.number.isRequired,
   children: PropTypes.element
};

export default TableHeadMobileRow;
