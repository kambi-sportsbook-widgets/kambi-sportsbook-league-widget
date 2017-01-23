import React, { PropTypes } from 'react';
import { translationModule } from 'kambi-widget-core-library';
import styles from './Legend.scss';
import PositionCircle from '../Position/Circle/PositionCircle';

const t = translationModule.getTranslation.bind(translationModule);

const Legend = ({ items }) => (
   <ul className={styles.legend}>
      {items.map((item, i) => (
         <li key={i}>
            <div className={styles.circle}><PositionCircle color={PositionCircle.COLORS[item.color]} /></div>
            <p>{t(item.description)}</p>
         </li>
      ))}
   </ul>
);

Legend.propTypes = {

   /**
    * Array of legend items
    */
   items: PropTypes.arrayOf(PropTypes.shape({
      color: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired
   })).isRequired

};

export default Legend;
