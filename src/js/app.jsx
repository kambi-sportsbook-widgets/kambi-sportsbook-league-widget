import React from 'react';
import ReactDOM from 'react-dom';
import { coreLibrary, widgetModule } from 'kambi-widget-core-library';
import LeagueTableWidget from './Components/LeagueTableWidget';
import store from './Service/store';
import position from './Service/position';

coreLibrary.init({
   filter: null, // if null will use CoreLibrary.pageInfo.leaguePaths
   // filter: '/football/england/premier_league', // for testing
   criterionId: 1001221607, // football To Win criterionId
   title: null,
   widgetTrackingName: 'gm-league-table-widget'
})
.then(() => {
   coreLibrary.setWidgetTrackingName(coreLibrary.args.widgetTrackingName);

   let filter = (function() {
      if (coreLibrary.args.filter != null) {
         return coreLibrary.args.filter;
      }

      if (coreLibrary.pageInfo.leaguePaths != null && coreLibrary.pageInfo.leaguePaths.length === 1) {
         return coreLibrary.pageInfo.leaguePaths[0];
      }

      throw new Error('LeagueTable: No filter provided');
   })();

   // the rest of the code expects that the filter string starts with '/'
   if (filter[0] !== '/') {
      filter = '/' + filter;
   }

   return Promise.all([
      store.getData(filter, coreLibrary.args.criterionId),
      position.getLegend(filter),
      position.getColorMatcher(filter)
   ]);
})
.then(
   ([data, positionLegend, positionColorMatcher]) => {
      ReactDOM.render(
         <LeagueTableWidget
            event={data.event}
            betOffers={data.betOffers}
            statistics={data.statistics}
            title={coreLibrary.args.title}
            collapsable={coreLibrary.pageInfo.pageType !== 'home'}
            positionLegend={positionLegend}
            positionColorMatcher={positionColorMatcher}
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
