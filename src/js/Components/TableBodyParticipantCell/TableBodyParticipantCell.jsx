import React from 'react';
import PropTypes from 'prop-types';
import { translationModule } from 'kambi-widget-core-library';
import styles from './TableBodyParticipantCell.scss';

const t = translationModule.getTranslation.bind(translationModule);

const TableBodyParticipantCell = ({ name }) => {
   return (
      <td className={styles.general} title={t('Participant name')}>{name}</td>
   );
};

TableBodyParticipantCell.propTypes = {
   /**
    * Participant name
    */
   name: PropTypes.string.isRequired
};

export default TableBodyParticipantCell;
