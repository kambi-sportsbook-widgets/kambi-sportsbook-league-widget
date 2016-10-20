import React from 'react';
import { OutcomeComponent } from 'widget-components';

const TableBodyOutcomeCell = ({ outcome, event }) => {
   return (
      <div className="l-flexbox l-flex-2 l-ml-6" data-item-attr="betOffer">
         <OutcomeComponent outcome={outcome} event={event} />
      </div>
   );
};

TableBodyOutcomeCell.propTypes = {
   /**
    * Outcome entity
    */
   outcome: React.PropTypes.object.isRequired,

   /**
    * Optional event entity
    */
   event: React.PropTypes.object
};

export default TableBodyOutcomeCell;
