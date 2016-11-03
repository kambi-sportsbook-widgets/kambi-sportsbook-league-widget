import React, { PropTypes } from 'react';
import styles from './TableBody.scss';

const TableBody = ({ children }) => {
   return (
      <tbody>
         {children.map((row, i) =>
            <tr key={i} className={styles.general}>
               {row}
               <td className="margin" />
            </tr>
         )}
      </tbody>
   );
};

TableBody.propTypes = {
   children: PropTypes.arrayOf(PropTypes.node)
};

export default TableBody;
