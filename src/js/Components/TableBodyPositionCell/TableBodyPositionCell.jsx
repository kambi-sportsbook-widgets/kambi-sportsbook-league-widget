import React, { PropTypes } from 'react';
import styles from './TableBodyPositionCell.scss';

const TableBodyPositionCell = ({ children }) => {
   return (
      <td className={styles.general}>
         {children}
      </td>
   );
};

TableBodyPositionCell.propTypes = {
   children: PropTypes.element
};

export default TableBodyPositionCell;
