import React from 'react';
import { translationModule } from 'widget-core-library';
import { OutcomeComponent } from 'widget-components';

const TableRow = ({ participant, columns, event }) => {
   const t = translationModule.getTranslation.bind(translationModule);

   return (
      <div
         className="kw-table-item KambiWidget-card-border-color KambiWidget-card-background-color--hoverable l-flexbox
               l-horizontal l-align-center l-pl-16 l-pr-16 l-pt-6 l-pb-6"
      >
         {columns.map((column) => {
            return (
               <div
                  key={column.key}
                  title={t(column.key)}
                  className="l-flex-1 text-truncate"
                  data-item-attr={column.key}
               >
                  {participant ? participant[column.key] : null}
               </div>
            );
         })}
         {participant.outcomes.map((outcome) => {
            return (
               <div
                  className="l-flexbox l-flex-2 l-ml-6"
                  data-item-attr="betOffer"
                  key={outcome.id}
               >
                  <OutcomeComponent outcome={outcome} event={event} />
               </div>
            );
         })}
      </div>
   );
};

TableRow.propTypes = {
   participant: React.PropTypes.object.isRequired,
   columns: React.PropTypes.array.isRequired,
   event: React.PropTypes.object.isRequired
};

export default TableRow;
