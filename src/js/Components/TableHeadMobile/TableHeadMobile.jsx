import React, { PropTypes, Component } from 'react';
import TableHeadDefaultRow from '../TableHeadDefaultRow/TableHeadDefaultRow';
import ColumnPickerButton from '../ColumnPickerButton/ColumnPickerButton';
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
      return (
         <thead onClick={this.props.onHeadClick}>
            <tr className={['KambiWidget-card-border-color', 'KambiWidget-card-support-text-color', styles['mobile-row']].join(' ')}>
               <th colSpan="2" className="title">{this.props.title}</th>
               <th colSpan={this.columnGroup.columns.length} className="column-picker">
                  {!this.props.hiddenMode &&
                     <ColumnPickerButton
                        options={this.props.columnGroups}
                        selected={this.props.initialColumnGroupIdx}
                        onChange={this.columnGroupChanged.bind(this)}
                     />
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
    * Called on header click
    */
   onHeadClick: PropTypes.func.isRequired,

   /**
    * Called on columns configuration change (with column group index argument)
    */
   onColumnGroupChanged: PropTypes.func.isRequired,

   /**
    * Should mobile header be displayed in widget's hidden mode?
    */
   hiddenMode: PropTypes.bool
};

TableHeadMobile.defaultProps = {
   hiddenMode: false
};

export default TableHeadMobile;
