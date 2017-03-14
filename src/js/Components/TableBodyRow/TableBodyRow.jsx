import React, { Children, PropTypes } from 'react';
import styles from './TableBodyRow.scss';

const TableBodyRow = ({ children }) => (
   <tr className={['KambiWidget-card-inner-border', styles.row].join(' ')}>
      {children}
      <td className='margin' />
   </tr>
);

TableBodyRow.propTypes = {
   /**
    * Inner rows
    */
   children: PropTypes.node
};

export default TableBodyRow;
