import React from 'react';

const TableBodyCell = ({ value, handle, title }) => {

   return (
      <div
         title={title}
         className="l-flex-1 text-truncate"
         data-item-attr={handle}
      >
         {value}
      </div>
   );
};

TableBodyCell.propTypes = {
   /**
    * Cell value
    */
   value: React.PropTypes.oneOfType([React.PropTypes.string, React.PropTypes.number]),

   /**
    * Handle used to distinguish column in stylesheet
    */
   handle: React.PropTypes.string.isRequired,

   /**
    * Cell title (displayed on hover)
    */
   title: React.PropTypes.string
};

export default TableBodyCell;
