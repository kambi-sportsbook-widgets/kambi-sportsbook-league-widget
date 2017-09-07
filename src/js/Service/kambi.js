import { offeringModule, statisticsModule } from 'kambi-widget-core-library';

let title = '';

/**
 * Sets the title based on the event path attribute
 * Does not need to be the event with the right betoffers as all events will have the same path
 * @param {Object} event
 */
const setTitle = (event) => {
   try {
      const path = event.event.path;

      const idx = path.length >= 3 ? 2 : path.length - 1;

      title = path[idx].name;
   } catch (e) {
      // there might not be any events at all
      title = '';
   }
};

/**
 * Fetches competition event for given filter and criterion identifier.
 * @param {String} filter
 * @param {number} criterionId Criterion identifier
 * @returns {Promise.<Object>}
 */
const getCompetitionEvent = (filter, criterionId) => {
   if (Number.isNaN(criterionId)) {
      return Promise.resolve(null);
   }

   // modify filter to match only competitions
   const competitionsFilter = (() => {
      const parts = filter.split('/')
         .filter(termKey => termKey); // removes empty strings

      for (let i = parts.length; i < 4; i++) {
         parts.push('all');
      }

      parts.push('competitions');

      return parts.join('/');
   })();

   // fetch competitions for previously prepared filter
   return offeringModule.getEventsByFilter(competitionsFilter)
      .then((response) => {
         if (!response || !Array.isArray(response.events) || response.events.length === 0) {
            return null;
         }

         // filtering the response to contain just the lowest year events.
         let lowestYear = Number.MAX_VALUE;
         response.events.forEach((ev) => {
            const evYear = (new Date(ev.event.start)).getYear();
            if (evYear < lowestYear) {
               lowestYear = evYear;
            }
         });

         const filteredEvents = response.events.filter((ev) => {
            const evYear = (new Date(ev.event.start)).getYear();

            const hasCriterionBetoffer = ev.betOffers.find(bo => bo.criterion.id === criterionId);

            return ev.event.type === 'ET_COMPETITION' && evYear === lowestYear && hasCriterionBetoffer;
         });

         if (filteredEvents.length === 0) {
            console.warn(`Competition event not found for filter=${filter} and criterionId=${criterionId}. No Betoffers to show`);
            setTitle(response.events[0]); // original response
            return null;
         }

         return offeringModule.getEvent(filteredEvents[0].event.id)
            .then((response2) => {
               setTitle(response2);
               return response2;
            })
            .catch(() => {
               return null;
            })
      })
};

/**
 * Fetches and prepares data for widget.
 * @param {string} filter Events filter
 * @param {number|null} criterionId Criterion identifier
 * @returns {Promise.<object>}
 */
const getData = (filter, criterionId) => {
   criterionId = parseInt(criterionId, 10);

   const parts = filter.split('/')
      .filter(termKey => termKey); // removes empty strings

   for (let i = parts.length; i < 3; i++) {
      parts.push('all');
   }
   filter = '/' + parts.join('/');

   return Promise.all([
      getCompetitionEvent(filter, criterionId),
      statisticsModule.getLeagueTableStatistics(filter)
   ])
      .then(([event, statistics]) => {
         // don't look for bet offers if criterion identifier is not set
         let betOffers;
         if (Number.isNaN(criterionId) || event == null) {
            betOffers = [];
         } else {
            betOffers = event.betOffers.filter(bo => bo.criterion.id === criterionId)
         }

         return {
            title: title,
            betOffers: betOffers,
            statistics: statistics.leagueTableRows.map((row) => {
               row.goalsDifference = row.goalsFor - row.goalsAgainst;
               row.outcomes = betOffers.map(bo => bo.outcomes.find(oc => oc.participantId === row.participantId));
               return row;
            })
         };
      });
};


export default { getData };
