import React, { PropTypes, Component } from 'react';
import { translationModule } from 'kambi-widget-core-library';
import styles from './ColumnPickerButton.scss';

const t = translationModule.getTranslation.bind(translationModule);

class ColumnPickerButton extends Component {

   constructor(props) {
      super(props);

      this.state = {
         selected: this.props.selected,
         dropDown: false
      };

      // called on background click when drop down window is open
      this.onBackgroundClick = () => {
         // setState prevents event from being processed by onOptionClick handler
         // so it is moved to the next cycle
         setTimeout(() => this.setState({ dropDown: false }), 0);
         window.document.body.removeEventListener('click', this.onBackgroundClick);
      }
   }

   /**
    * Shows drop down box with available options.
    * @param {SyntheticEvent} event Click event
    */
   onButtonClick(event) {
      // @todo: KSBWI-799 parent containers should take care of this
      event.stopPropagation();
      this.setState({ dropDown: true });
      window.document.body.addEventListener('click', this.onBackgroundClick);
   }

   /**
    * Called on drop down's option click.
    * @param {number} idx Option index
    * @param {SyntheticEvent} event Click event
    */
   onOptionClick(idx, event) {
      // @todo: KSBWI-799 parent containers should take care of this
      event.stopPropagation();

      // nothing changed - hide drop down
      if (this.state.selected === idx) {
         return;
      }

      // selected different option
      this.setState({ selected: idx });

      this.props.onChange(idx);
   }

   /**
    * Renders button.
    * @returns {XML}
    */
   render() {
      return (
         <div className={styles.general}>
            <button className={styles.button} onClick={this.onButtonClick.bind(this)}>
               {t(this.props.options[this.state.selected].title)}
               <i />
            </button>
            {
               this.state.dropDown &&
                  <ul className={styles.dropDown}>
                     {this.props.options.map((option, i) => {
                        const classNames = [
                           'KambiWidget-card-background-color',
                           'KambiWidget-card-background-color--hoverable',
                           'KambiWidget-card-background-color--clickable'
                        ];

                        if (this.state.selected == i) {
                           classNames.push('KambiWidget-primary-color');
                        }

                        return (
                           <li
                              key={option.id}
                              className={classNames.join(' ')}
                              onClick={this.onOptionClick.bind(this, i)}
                           >
                              {option.title}
                           </li>
                        );
                     })}
                  </ul>
            }
         </div>
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
