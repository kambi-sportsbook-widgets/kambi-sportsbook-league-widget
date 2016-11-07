import React, { PropTypes, Component } from 'react';
import TableHeadDefaultRow from '../TableHeadDefaultRow/TableHeadDefaultRow';
import ColumnPickerButton from '../ColumnPickerButton/ColumnPickerButton';
import styles from './TableHeadMobile.scss';

class TableHeadMobile extends Component {

   constructor(props) {
      super(props);

      this.state = {
         columnGroup: this.props.defaultColumnGroup
      };
   }

   /**
    * Handles column group change.
    * @param {string} columnGroup Column group key
    */
   columnsChanged(columnGroup) {
      this.setState({ columnGroup });
      this.props.onColumnsChanged(columnGroup);
   }

   /**
    * Returns currently selected columns group definition.
    * @returns {object}
    */
   get columnGroup() {
      return this.props.columnGroups[this.state.columnGroup];
   }

   /**
    * Renders table header for mobile devices.
    * @returns {XML}
    */
   render() {
      return (
         <thead onClick={this.props.onHeadClick}>
            <tr className={styles['mobile-row']}>
               <th colSpan="2" className="title">{this.props.title}</th>
               <th colSpan={this.columnGroup.columns.length} className="column-picker">
                  {!this.props.hiddenMode &&
                     <ColumnPickerButton groups={this.props.columnGroups} onChange={this.columnsChanged.bind(this)} />
                  }
               </th>
               <th className="margin" />
            </tr>
            <TableHeadDefaultRow columns={this.columnGroup.columns} />
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
   columnGroups: PropTypes.object.isRequired,

   /**
    * Default column group key
    */
   defaultColumnGroup: PropTypes.string.isRequired,

   /**
    * Called on header click
    */
   onHeadClick: PropTypes.func.isRequired,

   /**
    * Called on columns configuration change (with column group key argument)
    */
   onColumnsChanged: PropTypes.func.isRequired,

   /**
    * Should mobile header be displayed in widget's hidden mode?
    */
   hiddenMode: PropTypes.bool
};

TableHeadMobile.defaultProps = {
   hiddenMode: false
};

export default TableHeadMobile;
