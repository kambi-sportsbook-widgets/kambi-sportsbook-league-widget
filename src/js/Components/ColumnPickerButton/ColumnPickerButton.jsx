import React from 'react';
import { translationModule } from 'kambi-widget-core-library';
import styles from './ColumnPickerButton.scss';

const t = translationModule.getTranslation.bind(translationModule);

class ColumnPickerButton extends React.Component {

   constructor(props) {
      super(props);

      this.state = {
         selected: Object.keys(props.groups)[0]
      };
   }

   onClick() {
      const keys = Object.keys(this.props.groups);

      const selected = keys[(keys.indexOf(this.state.selected) + 1) % keys.length];

      this.setState({
         selected: selected
      });

      this.props.onChange(selected);
   }

   render() {
      return (
         <button className={styles.general} onClick={this.onClick.bind(this)}>
            {t(this.props.groups[this.state.selected].title)}
            <i />
         </button>
      );
   }
}

ColumnPickerButton.propTypes = {
   /**
    * Array of options
    */
   groups: React.PropTypes.object.isRequired,

   /**
    * Option change handler
    */
   onChange: React.PropTypes.func.isRequired
};

export default ColumnPickerButton;
