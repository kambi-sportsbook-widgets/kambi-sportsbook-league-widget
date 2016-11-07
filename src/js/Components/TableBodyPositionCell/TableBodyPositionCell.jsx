import React, { PropTypes } from 'react';
import { translationModule } from 'kambi-widget-core-library';
import styles from './TableBodyPositionCell.scss';

const t = translationModule.getTranslation.bind(translationModule);

const TableBodyPositionCell = ({ children }) => {
   return (
      <td className={styles.general} title={t('Position')}>
         {children}
      </td>
   );
};

TableBodyPositionCell.propTypes = {
   /**
    * Inner element - PositionIndicator
    */
   children: PropTypes.element.isRequired
};

export default TableBodyPositionCell;
