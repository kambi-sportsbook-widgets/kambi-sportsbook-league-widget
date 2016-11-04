import React, { PropTypes } from 'react';
import { translationModule } from 'kambi-widget-core-library';
import styles from './TableBodyStatsCell.scss';

const t = translationModule.getTranslation.bind(translationModule);

const TableBodyStatsCell = ({ column, value }) => {
   return (
      <td
         title={t(column.name)}
         className={[styles.general, column.className].join(' ')}
      >
         {value}
      </td>
   );
};

TableBodyStatsCell.propTypes = {
   /**
    * Statistics column definition
    */
   column: PropTypes.object.isRequired,

   /**
    * Statistics value
    */
   value: PropTypes.number
};

export default TableBodyStatsCell;
