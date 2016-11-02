import React from 'react';

const TableBody = ({ children }) => {
   return (
      <main className="KambiWidget-font l-flexbox l-vertical l-flexed l-pack-start">
         {children}
      </main>
   );
};

TableBody.propTypes = {
   /**
    * Row components
    */
   children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
};

export default TableBody;
