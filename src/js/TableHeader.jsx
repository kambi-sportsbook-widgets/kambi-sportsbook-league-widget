import React from 'react';
import { translationModule } from 'widget-core-library';

const TableHeader = ({ betOffers, columns, title, onClick }) => {
   const t = translationModule.getTranslation.bind(translationModule);

   return (
      <header
         className="KambiWidget-header KambiWidget-font KambiWidget-card-border-color l-flexbox l-horizontal l-pl-16 l-pr-16 l-pt-12 l-pb-12 l-mb-12"
         onClick={onClick}
      >
         {columns.map((column, i) => {
            return (
               <div
                  key={column.key}
                  className="l-flex-1 text-truncate"
                  data-item-attr={column.key}
                  title={['position', 'participantName'].indexOf(column.key) < 0 ? t(column.key) : ''}
               >
                  <span>{i > 0 ? t(column.value) : title}</span>
               </div>
            );
         })}
         {betOffers.map((betOffer) => {
            return (
               <div
                  className="l-ml-6 l-flex-2 text-truncate"
                  title={betOffer.betOfferType.name}
                  data-item-attr="betOffer"
                  key={betOffer.id}
               >
                  {betOffer.betOfferType.name}
               </div>
            );
         })}
      </header>
   );
};

TableHeader.propTypes = {
   betOffers: React.PropTypes.array.isRequired,
   columns: React.PropTypes.array.isRequired,
   onClick: React.PropTypes.func.isRequired,
   title: React.PropTypes.string
};

export default TableHeader;
