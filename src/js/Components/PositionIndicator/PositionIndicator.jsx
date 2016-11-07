import React, { PropTypes } from 'react';
import styles from './PositionIndicator.scss';

const positionCircleClassName = function(position, count) {
   return null;

/*   if (position >= 1 && position <= 3) {
      return 'green';
   } else if (position === 4) {
      return 'light-green';
   } else if (position === 5) {
      return 'orange';
   } else if (count - position < 3) {
      return 'red';
   } else {
      return null;
   }
   */
};

const PositionIndicator = ({ position, count, change }) => {
   return (
      <span>
         <span className={[styles.position, positionCircleClassName(position, count)].join(' ')}>
            {position}
         </span>
         {change !== 0 &&
            <i className={[styles.triangle, change > 0 ? 'up' : 'down'].join(' ')} />}
      </span>
   );
};

PositionIndicator.propTypes = {
   /**
    * Current participant position
    */
   position: PropTypes.number.isRequired,

   /**
    * Participants count
    */
   count: PropTypes.number.isRequired,

   /**
    * Position change from last statistics publication (positive, negative or 0 number)
    */
   change: PropTypes.number
};

PositionIndicator.defaultProps = {
   change: 0
};

export default PositionIndicator;
