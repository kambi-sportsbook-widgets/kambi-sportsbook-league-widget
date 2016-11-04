import React, { PropTypes } from 'react';
import styles from './TableBodyOutcomeCell.scss';

const TableBodyOutcomeCell = ({ children }) => {
   return (
      <td className={styles.general}>
         <div className="wrapper">
            {children}
         </div>
      </td>
   );
};

TableBodyOutcomeCell.propTypes = {
   /**
    * Inner element - OutcomeButton
    */
   children: PropTypes.node.isRequired
};

export default TableBodyOutcomeCell;
