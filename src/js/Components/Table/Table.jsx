import React, { PropTypes } from 'react';
import styles from './Table.scss';

const Table = ({ children }) => {
   return (
      <table className={['KambiWidget-card-background-color', styles.general].join(' ')}>
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
