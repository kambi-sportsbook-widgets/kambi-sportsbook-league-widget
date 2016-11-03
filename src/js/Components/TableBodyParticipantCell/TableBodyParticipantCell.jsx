import React, { PropTypes } from 'react';
import styles from './TableBodyParticipantCell.scss';

const TableBodyParticipantCell = ({ name }) => {
   return (
      <td className={styles.general}>{name}</td>
   );
};

TableBodyParticipantCell.propTypes = {
   name: PropTypes.string.isRequired
};

export default TableBodyParticipantCell;
