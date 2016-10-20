import React from 'react';

const TableBodyRow = ({ children }) => {
   return (
      <div
         className="kw-table-item KambiWidget-card-border-color KambiWidget-card-background-color--hoverable l-flexbox
               l-horizontal l-align-center l-pl-16 l-pr-16 l-pt-6 l-pb-6"
      >
         {children}
      </div>
   );
};

TableBodyRow.propTypes = {
   /**
    * Cell components
    */
   children: React.PropTypes.arrayOf(React.PropTypes.node).isRequired
};

export default TableBodyRow;
