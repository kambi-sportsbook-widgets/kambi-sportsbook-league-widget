import React, { Children, PropTypes } from 'react';
import styles from './TableBody.scss';

const TableBody = ({ children }) => {
   return (
      <tbody>
         {Children.map(children, (row, i) =>
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
