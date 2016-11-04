import React, { PropTypes } from 'react';
import styles from './Table.scss';

const Table = ({ children }) => {
   return (
      <table className={styles.general}>
         {children}
      </table>
   );
};

Table.propTypes = {
   /**
    * Inner elements
    */
   children: PropTypes.node
};

export default Table;
