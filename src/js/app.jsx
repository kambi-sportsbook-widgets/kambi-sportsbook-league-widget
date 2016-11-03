import React from 'react';
import ReactDOM from 'react-dom';
import { coreLibrary, widgetModule } from 'kambi-widget-core-library';
import LeagueTableWidget from './Components/LeagueTableWidget';
import store from './Store/store';

coreLibrary.init({
   filter: '/football/england/premier_league', // if null will use CoreLibrary.pageInfo.leaguePaths
   criterionId: 1001221607,
   updatedTime: '',
   title: null,
   widgetTrackingName: 'gm-league-table-widget'
})
.then(() => {
   const filter = (function() {
      if (coreLibrary.args.filter != null) {
         return coreLibrary.args.filter;
      }

      if (coreLibrary.pageInfo.leaguePaths != null && coreLibrary.pageInfo.leaguePaths.length === 1) {
         return coreLibrary.pageInfo.leaguePaths[0];
      }

      throw new Error('No filter provided');
   })();

   return store.getData(filter, coreLibrary.args.criterionId);
})
.then(
   (data) => {
      ReactDOM.render(
         <LeagueTableWidget
            event={data.event}
            betOffers={data.betOffers}
            statistics={data.statistics}
            widgetTrackingName={coreLibrary.args.widgetTrackingName}
            title={coreLibrary.args.title}
         />,
         document.getElementById('root')
      );
   }
)
.catch((error) => {
   widgetModule.removeWidget();
   throw error;
});
