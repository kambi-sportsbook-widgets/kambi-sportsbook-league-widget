import React, { PropTypes } from 'react';

const TableBody = ({ children }) => (
   <tbody>{children}</tbody>
);

TableBody.propTypes = {
   /**
    * Inner rows
    */
   children: PropTypes.node
};

export default TableBody;
