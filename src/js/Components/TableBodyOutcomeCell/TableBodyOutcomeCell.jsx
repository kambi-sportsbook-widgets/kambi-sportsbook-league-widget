import React from 'react';
import PropTypes from 'prop-types';
import styles from './TableBodyOutcomeCell.scss';

const TableBodyOutcomeCell = ({ children }) => {
   return (
      <td className={styles.general}>
         <div className={styles.wrapper}>
            {children}
         </div>
      </td>
   );
};

TableBodyOutcomeCell.propTypes = {
   /**
    * Inner element - OutcomeButton
    */
   children: PropTypes.node
};

export default TableBodyOutcomeCell;
