import React from 'react';

const TableHeadOutcomeColumn = ({ title }) => {
   return (
      <div
         className="l-ml-6 l-flex-2 text-truncate"
         title={title}
         data-item-attr="betOffer"
      >
         {title}
      </div>
   );
};

TableHeadOutcomeColumn.propTypes = {
   /**
    * Column title (displayed on hover)
    */
   title: React.PropTypes.string.isRequired,
};

export default TableHeadOutcomeColumn;
