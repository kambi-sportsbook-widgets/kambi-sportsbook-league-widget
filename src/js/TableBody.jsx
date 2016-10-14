import React from 'react';
import { translationModule } from 'widget-core-library';
import TableRow from './TableRow';

const TableBody = ({ participants, columns, event, updated }) => {
   const t = translationModule.getTranslation.bind(translationModule);

   return (
      <main className="KambiWidget-font l-flexbox l-vertical l-flexed l-pack-start">
         {participants.map(participant => <TableRow key={participant.participantId} participant={participant} columns={columns} event={event} />)}
         <div className="kw-table-item l-flexbox l-align-center l-pl-16 l-pr-16 l-pt-6 l-pb-6">{t('Last updated')}: {updated}</div>
      </main>
   );
};

TableBody.propTypes = {
   participants: React.PropTypes.array.isRequired,
   columns: React.PropTypes.array.isRequired,
   event: React.PropTypes.object,
   updated: React.PropTypes.string
};

export default TableBody;
