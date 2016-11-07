import React, { PropTypes, Component } from 'react';
import { translationModule } from 'kambi-widget-core-library';
import styles from './ColumnPickerButton.scss';

const t = translationModule.getTranslation.bind(translationModule);

class ColumnPickerButton extends Component {

   constructor(props) {
      super(props);

      this.state = {
         selected: this.props.selected
      };
   }

   /**
    * Changes selected option to next one.
    * @param {SyntheticEvent} event Click event
    */
   onClick(event) {
      const selected = (this.state.selected + 1) % this.props.options.length;

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
            {t(this.props.options[this.state.selected].title)}
            <i />
         </button>
      );
   }
}

ColumnPickerButton.propTypes = {
   /**
    * Options array
    */
   options: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired
   })).isRequired,

   /**
    * Defines which option should be checked upon component creation
    */
   selected: PropTypes.number.isRequired,

   /**
    * Option change handler
    */
   onChange: PropTypes.func.isRequired
};

export default ColumnPickerButton;
