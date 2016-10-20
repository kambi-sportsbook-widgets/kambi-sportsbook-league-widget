import React from 'react';

const TableHead = ({ children, onClick }) => {
   return (
      <header
         className="KambiWidget-header KambiWidget-font KambiWidget-card-border-color l-flexbox l-horizontal l-pl-16 l-pr-16 l-pt-12 l-pb-12 l-mb-12"
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
