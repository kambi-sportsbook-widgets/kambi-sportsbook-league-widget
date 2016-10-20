import React from 'react';

const TableHeadColumn = ({ value, handle, title }) => {
   return (
      <div
         className="l-flex-1 text-truncate"
         data-item-attr={handle}
         title={title}
      >
         <span>{value}</span>
      </div>
   );
};

TableHeadColumn.propTypes = {
   /**
    * Column value
    */
   value: React.PropTypes.string.isRequired,

   /**
    * Handle used to distinguish column in stylesheet
    */
   handle: React.PropTypes.string.isRequired,

   /**
    * Column title (displayed on hover)
    */
   title: React.PropTypes.string
};

export default TableHeadColumn;
