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
   /**
    * Inner element - PositionIndicator
    */
   children: PropTypes.element.isRequired
};

export default TableBodyPositionCell;
