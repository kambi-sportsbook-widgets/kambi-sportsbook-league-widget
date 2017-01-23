import React, { PropTypes } from 'react';
import styles from './PositionCircle.scss';

const COLORS = {
   GREEN: 'KambiWidget-box--win',
   LIGHT_GREEN: 'KambiWidget-box--win light',
   ORANGE: 'KambiWidget-box--draw',
   LIGHT_ORANGE: 'KambiWidget-box--draw light',
   RED: 'KambiWidget-box--lose',
   LIGHT_RED: 'KambiWidget-box--lose light',
   TRANSPARENT: 'transparent'
};

const PositionCircle = ({ color, children }) => (
   <span className={`${styles.wrapper} ${color == COLORS.TRANSPARENT && 'no-circle'}`}>
      <span className={`${styles.circle} ${color}`}>
         {children}
      </span>
   </span>
);

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
