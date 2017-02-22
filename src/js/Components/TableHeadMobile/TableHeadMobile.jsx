import React, { PropTypes, Component } from 'react';
import { translationModule } from 'kambi-widget-core-library';
import { DropdownButton } from 'kambi-widget-components';
import TableHeadDefaultRow from '../TableHeadDefaultRow/TableHeadDefaultRow';
import styles from './TableHeadMobile.scss';

class TableHeadMobile extends Component {

   constructor(props) {
      super(props);

      this.state = {
         columnGroupIdx: this.props.initialColumnGroupIdx
      };
   }

   /**
    * Handles column group change.
    * @param {number} idx Column group key
    */
   columnGroupChanged(idx) {
      this.setState({ columnGroupIdx: idx });
      this.props.onColumnGroupChanged(idx);
   }

   /**
    * Returns currently selected columns group definition.
    * @returns {object}
    */
   get columnGroup() {
      return this.props.columnGroups[this.state.columnGroupIdx];
   }

   /**
    * Renders table header for mobile devices.
    * @returns {XML}
    */
   render() {
      const columnPickerOptions = this.props.columnGroups.map((column) => {
         return translationModule.getTranslation(column.title);
      });
      let headerCssClasses = [
         'KambiWidget-card-header-border',
         'KambiWidget-secondary-header',
         'KambiWidget-card-support-text-color',
         styles['mobile-row'],
      ];
      headerCssClasses = headerCssClasses.join(' ');
      return (
         <thead>
            <tr className={headerCssClasses}>
               <th colSpan='2' className='title'>{this.props.title}</th>
               <th colSpan={this.columnGroup.columns.length} className='column-picker'>
                  {!this.props.hiddenMode &&
                     <DropdownButton
                        options={columnPickerOptions}
                        selected={this.props.initialColumnGroupIdx}
                        onChange={this.columnGroupChanged.bind(this)}
                     />
                  }
               </th>
               <th className='margin' />
            </tr>
            <TableHeadDefaultRow
               columns={this.columnGroup.columns}
             />
         </thead>
      );
   }
}

TableHeadMobile.propTypes = {
   /**
    * Widget's title
    */
   title: PropTypes.string.isRequired,

   /**
    * Column groups definitions
    */
   columnGroups: PropTypes.arrayOf(PropTypes.shape({
      id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      columns: PropTypes.arrayOf(PropTypes.shape({
         name: PropTypes.string.isRequired,
         short: PropTypes.string.isRequired
      })).isRequired
   })).isRequired,

   /**
    * Defines which column group should be displayed upon component creation
    */
   initialColumnGroupIdx: PropTypes.number,

   /**
    * Called on columns configuration change (with column group index argument)
    */
   onColumnGroupChanged: PropTypes.func.isRequired,

   /**
    * Should mobile header be displayed in widget's hidden mode?
    */
   hiddenMode: PropTypes.bool,
};

TableHeadMobile.defaultProps = {
   hiddenMode: false
};

export default TableHeadMobile;
