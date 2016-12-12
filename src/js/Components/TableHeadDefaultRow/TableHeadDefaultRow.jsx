import React, { PropTypes } from 'react';
import { translationModule } from 'kambi-widget-core-library';
import styles from './TableHeadDefaultRow.scss';

const t = translationModule.getTranslation.bind(translationModule);

const TableHeadDefaultRow = ({ title, columns, hiddenMode, collapsable }) => {
   let headerCssClasses = [
      'KambiWidget-card-header-border',
      'KambiWidget-secondary-header',
      'KambiWidget-card-support-text-color',
      styles.general,
      styles['general-non-collapsable']
   ];

   if (collapsable === true) {
      headerCssClasses = [
         'KambiWidget-header',
         styles.general
      ];
   }

   headerCssClasses = headerCssClasses.join(' ');

   return (
      <tr className={headerCssClasses}>
         <th colSpan='2' className='title'>
            {title}
         </th>
         {
            columns.map((column, i) =>
               <th
                  key={i}
                  className='column-name'
                  title={t(column.name)}
               >
                  {hiddenMode ? '' : column.short}
               </th>
            )
         }
         <th className='margin' />
      </tr>
   );
};

TableHeadDefaultRow.propTypes = {
   /**
    * Widget's title
    */
   title: PropTypes.string,

   /**
    * Statistics and/or outcomes columns to be displayed
    */
   columns: PropTypes.arrayOf(PropTypes.shape({
      name: PropTypes.string.isRequired,
      short: PropTypes.string.isRequired
   })).isRequired,

   /**
    * Should mobile header be displayed in widget's hidden mode?
    */
   hiddenMode: PropTypes.bool,

   /**
    * If true makes the header black background
    */
   collapsable: PropTypes.bool.isRequired
};

TableHeadDefaultRow.defaultProps = {
   title: '',
   hiddenMode: false
};

export default TableHeadDefaultRow;
