import React, { PropTypes, Component } from 'react';
import { translationModule } from 'kambi-widget-core-library';
import styles from './ColumnPickerButton.scss';

const t = translationModule.getTranslation.bind(translationModule);

class ColumnPickerButton extends Component {

   constructor(props) {
      super(props);

      this.state = {
         selected: Object.keys(props.groups)[0]
      };
   }

   /**
    * Changes selected option to next one.
    * @param {SyntheticEvent} event Click event
    */
   onClick(event) {
      const keys = Object.keys(this.props.groups);

      const selected = keys[(keys.indexOf(this.state.selected) + 1) % keys.length];

      this.setState({
         selected: selected
      });

      this.props.onChange(selected);

      event.stopPropagation();
   }

   /**
    * Renders button.
    * @returns {XML}
    */
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
    * Options map (<string, {title}>)
    */
   groups: PropTypes.object.isRequired,

   /**
    * Option change handler
    */
   onChange: PropTypes.func.isRequired
};

export default ColumnPickerButton;
