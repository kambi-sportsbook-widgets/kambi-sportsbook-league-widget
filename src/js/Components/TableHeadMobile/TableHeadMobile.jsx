import React, { PropTypes, Component } from 'react';
import { translationModule } from 'kambi-widget-core-library';
import TableHeadMobileRow from '../TableHeadMobileRow/TableHeadMobileRow';
import TableHeadDefaultRow from '../TableHeadDefaultRow/TableHeadDefaultRow';
import ColumnPickerButton from '../ColumnPickerButton/ColumnPickerButton';

const t = translationModule.getTranslation.bind(translationModule);

class TableHeadMobile extends Component {

   constructor(props) {
      super(props);

      this.state = {
         columnGroup: this.props.defaultColumnGroup
      };
   }

   columnsChanged(columnGroup) {
      this.setState({ columnGroup });
      this.props.onColumnsChanged(columnGroup);
   }

   get columnGroup() {
      return this.props.columnGroups[this.state.columnGroup];
   }

   render() {
      return (
         <thead onClick={this.props.onHeadClick}>
            <TableHeadMobileRow
               title={this.props.title}
               colSpan={this.columnGroup.columns.length}
            >
               <ColumnPickerButton groups={this.props.columnGroups} onChange={this.columnsChanged.bind(this)} />
            </TableHeadMobileRow>
            <TableHeadDefaultRow columnNames={this.columnGroup.columns.map(column => column.short)} />
         </thead>
      );
   }
}

TableHeadMobile.propTypes = {
   title: PropTypes.string.isRequired,
   columnGroups: PropTypes.object.isRequired,
   defaultColumnGroup: PropTypes.string.isRequired,
   onHeadClick: PropTypes.func.isRequired,
   onColumnsChanged: PropTypes.func.isRequired
};

export default TableHeadMobile;
