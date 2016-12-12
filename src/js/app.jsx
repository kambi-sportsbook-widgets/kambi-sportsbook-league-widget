import React from 'react';
import ReactDOM from 'react-dom';
import { coreLibrary, widgetModule } from 'kambi-widget-core-library';
import LeagueTableWidget from './Components/LeagueTableWidget';
import store from './Store/store';

let collapsable = false;

coreLibrary.init({
   filter: null, // if null will use CoreLibrary.pageInfo.leaguePaths
   // filter: '/football/england/premier_league', // for testing
   criterionId: 1001221607, // football To Win criterionId
   title: null,
   widgetTrackingName: 'gm-league-table-widget'
})
.then(() => {
   if (coreLibrary.pageInfo.pageType !== 'home') {
      collapsable = true;
   }

   const filter = (function() {
      if (coreLibrary.args.filter != null) {
         return coreLibrary.args.filter;
      }

      if (coreLibrary.pageInfo.leaguePaths != null && coreLibrary.pageInfo.leaguePaths.length === 1) {
         return coreLibrary.pageInfo.leaguePaths[0];
      }

      throw new Error('LeagueTable: No filter provided');
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
            collapsable={collapsable}
         />,
         document.getElementById('root')
      );
   }
)
.catch((error) => {
   console.trace(error);
   widgetModule.removeWidget();
   throw error;
});
