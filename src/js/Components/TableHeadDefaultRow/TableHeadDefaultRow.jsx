import React, { PropTypes } from 'react';
import { translationModule } from 'kambi-widget-core-library';
import styles from './TableHeadDefaultRow.scss';

const t = translationModule.getTranslation.bind(translationModule);

const TableHeadDefaultRow = ({ title, columns, hiddenMode }) => {
   return (
      <tr className={styles.general}>
         <th colSpan="2" className="title">{title}</th>
         {columns.map((column, i) => <th key={i} className="column-name" title={t(column.name)}>{hiddenMode ? '' : column.short}</th>)}
         <th className="margin" />
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
      name: PropTypes.string,
      short: PropTypes.string
   })).isRequired,

   /**
    * Should mobile header be displayed in widget's hidden mode?
    */
   hiddenMode: PropTypes.bool
};

TableHeadDefaultRow.defaultProps = {
   title: '',
   hiddenMode: false
};

export default TableHeadDefaultRow;
