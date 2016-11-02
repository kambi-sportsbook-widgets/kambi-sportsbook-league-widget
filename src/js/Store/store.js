import { offeringModule, statisticsModule } from 'kambi-widget-core-library';

/**
 * Fetches competition event for given filter and criterion identifier.
 * @param {String} filter
 * @param {number} criterionId Criterion identifier
 * @returns {Promise.<Object>}
 */
const getCompetitionEvent = function(filter, criterionId) {
   // modify filter to match only competitions
   const competitionsFilter = (() => {
      const parts = filter.split('/').filter(termKey => !!termKey);

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
         return response.events.find((ev) => {
            return ev.event.type === 'ET_COMPETITION' &&
               ev.betOffers.find(bo => bo.criterion.id === criterionId);
         });
      })
      .then((event) => {
         if (!event) {
            throw new Error(`Competition not found for filter=${filter} and criterionId=${criterionId}`);
         }

         // following request will respond with all betOffers
         return offeringModule.getEvent(event.event.id);
      })
      .then((event) => {
         if (event === null) {
            throw new Error('Event not found');
         }

         return event;
      });
};

/**
 * Fetches and prepares data for widget.
 * @param {string} filter Events filter
 * @param {number|null} criterionId Criterion identifier
 * @returns {Promise.<object>}
 */
const getData = function(filter, criterionId) {
   criterionId = parseInt(criterionId, 10);

   return Promise.all([
      getCompetitionEvent(filter, criterionId),
      statisticsModule.getLeagueTableStatistics(filter)
   ])
      .then(([event, statistics]) => {
         // don't look for bet offers if criterion identifier is not set
         const betOffers = Number.isNaN(criterionId) ? []
            : event.betOffers.filter(bo => bo.criterion.id === criterionId);

         return {
            event: event,
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
