import React from 'react';
import ReactDOM from 'react-dom';
import { coreLibrary } from 'widget-core-library';
import LeagueTableWidget from './LeagueTableWidget';

coreLibrary.init({
   filter: '/football/england/premier_league', // if null will use CoreLibrary.pageInfo.leaguePaths
   criterionId: 1001221607,
   updatedTime: '',
   title: null,
   widgetTrackingName: 'gm-league-table-widget'
})
.then(
   () => {
      ReactDOM.render(<LeagueTableWidget args={coreLibrary.args} />, document.getElementById('root'));
   },
   error => console.error(error)
);
