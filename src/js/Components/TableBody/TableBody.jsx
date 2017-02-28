import React, { Children, PropTypes } from 'react';
import styles from './TableBody.scss';

const TableBody = ({ children }) => {
   // todo: use TableBodyRow (KSBWI-908)
   if (!children instanceof Array) {
      children = [];
   }

   return (
      <tbody>
         {children.map((row, i) =>
            <tr key={i} className={['KambiWidget-card-inner-border', styles.row].join(' ')}>
               {row}
               <td className='margin' />
            </tr>
         )}
      </tbody>
   );
};

TableBody.propTypes = {
   /**
    * Inner rows
    */
   children: PropTypes.node
};

export default TableBody;
