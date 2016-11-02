import React from 'react';
import styles from './TableHead.scss';

const TableHead = ({ children, onClick }) => {
   return (
      <header
         className={`KambiWidget-header KambiWidget-font KambiWidget-card-border-color ${styles['table-head']}`}
         onClick={onClick}
      >
         {children}
      </header>
   );
};

TableHead.propTypes = {
   /**
    * Column components
    */
   children: React.PropTypes.arrayOf(React.PropTypes.node).isRequired,

   /**
    * Table header clicked handler
    */
   onClick: React.PropTypes.func
};

export default TableHead;
