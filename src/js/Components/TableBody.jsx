import React from 'react';
import { translationModule } from 'kambi-widget-core-library';

const TableBody = ({ children, updated }) => {
   const t = translationModule.getTranslation.bind(translationModule);

   return (
      <main className="KambiWidget-font l-flexbox l-vertical l-flexed l-pack-start">
         {children}
         <div className="kw-table-item l-flexbox l-align-center l-pl-16 l-pr-16 l-pt-6 l-pb-6">{t('Last updated')}: {updated.toString()}</div>
      </main>
   );
};

TableBody.propTypes = {
   /**
    * Updated date
    */
   updated: React.PropTypes.instanceOf(Date).isRequired,

   /**
    * Row components
    */
   children: React.PropTypes.arrayOf(React.PropTypes.element).isRequired
};

export default TableBody;
