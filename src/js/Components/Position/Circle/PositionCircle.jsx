import React, { PropTypes } from 'react';
import styles from './PositionCircle.scss';

const PositionCircle = ({ color, children }) => (
   <span className={`${styles.circle} ${color}`}>
      {children}
   </span>
);

const COLORS = {
   GREEN: 'green',
   LIGHT_GREEN: 'light-green',
   ORANGE: 'orange',
   LIGHT_ORANGE: 'light-orange',
   RED: 'red',
   LIGHT_RED: 'light-red',
   TRANSPARENT: 'transparent'
};

PositionCircle.COLORS = COLORS;

PositionCircle.propTypes = {

   /**
    * Current participant position
    */
   color: PropTypes.oneOf(Object.keys(COLORS).map(k => COLORS[k])),

   /**
    * Optional node te be displayed inside circle
    */
   children: PropTypes.node

};

PositionCircle.defaultProps = {
   color: COLORS.TRANSPARENT
};

export default PositionCircle;
