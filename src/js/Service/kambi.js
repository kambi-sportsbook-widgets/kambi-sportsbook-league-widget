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
      return '';
   }
};

/**
 * Fetches competition event for given filter and criterion identifier.
 * @param {String} filter
 * @param {number} criterionId Criterion identifier
 * @returns {Promise.<Object>}
 */
const getCompetitionEvent = (filter, criterionId) => {
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
         if (!response || !Array.isArray(response.events)) {
            throw new Error('Invalid response from Kambi API');
         }

         // if criterion identifier is not set just find first event which is a competition
         if (Number.isNaN(criterionId)) {
            return response.events.find(ev => ev.event.type === 'ET_COMPETITION');
         }

         // search for event which is a competition and has a betOffer with given criterion identifier
         const event = response.events.find((ev) => {
            return ev.event.type === 'ET_COMPETITION' &&
               ev.betOffers.find(bo => bo.criterion.id === criterionId);
         });

         if (event == null) {
            console.warn(`Competition event not found for filter=${filter} and criterionId=${criterionId}. No Betoffers to show`);
            setTitle(response.events[0]);
            return null;
         }

         return offeringModule.getEvent(event.event.id)
            .then((event) => {
               setTitle(event);
               return event;
            }).catch(() => {
               console.warn('Event not found. No Betoffers to show');
               setTitle(response.events[0]);
               return null;
            });
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
