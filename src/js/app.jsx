import React from "react";
import ReactDOM from "react-dom";
import { coreLibrary, widgetModule } from "kambi-widget-core-library";
import LeagueTableWidget from "./Components/LeagueTableWidget";
import kambi from "./Service/kambi";
import position from "./Service/position";

coreLibrary
   .init({
      // filter: null, // if null will use CoreLibrary.pageInfo.leaguePaths
      // filter: "/football/netherlands/eredivisie", // for testing
      criterionId: 1001221607, // football To Win criterionId
      title: null,
      widgetTrackingName: "gm-league-table-widget"
   })
   .then(() => {
      let filter = (function () {
         if (coreLibrary.args.filter != null) {
            return coreLibrary.args.filter;
         }

         if (
            coreLibrary.pageInfo.leaguePaths != null &&
            coreLibrary.pageInfo.leaguePaths.length === 1
         ) {
            return coreLibrary.pageInfo.leaguePaths[0];
         }

         throw new Error("LeagueTable: No filter provided");
      })();

      // the rest of the code expects that the filter string starts with '/'
      if (filter[0] !== "/") {
         filter = "/" + filter;
      }

      return Promise.all([
         kambi.getData(filter, coreLibrary.args.criterionId),
         position.getLegend(filter),
         position.getColorMatcher(filter)
      ]);
   })
   .then(([data, positionLegend, positionColorMatcher]) => {
      let title = coreLibrary.args.title;
      if (title == null) {
         title = data.title;
      }
      ReactDOM.render(
         <LeagueTableWidget
            betOffers={data.betOffers}
            statistics={data.statistics}
            title={title}
            positionLegend={positionLegend}
            positionColorMatcher={positionColorMatcher}
         />,
         document.getElementById("root")
      );
   })
   .catch(error => {
      console.error(error);
      widgetModule.removeWidget();
   });
