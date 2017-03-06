/* eslint-env jest */

import kambi from '../../src/js/Service/kambi';
import { offeringModule, statisticsModule } from 'kambi-widget-core-library';


jest.mock('kambi-widget-core-library', () => ({
   offeringModule: {
      getEventsByFilter: jest.fn(),
      getEvent: jest.fn()
   },
   statisticsModule: {
      getLeagueTableStatistics: jest.fn()
   }
}));

describe('Kambi service', () => {
   beforeEach(() => {
      offeringModule.getEventsByFilter = jest.fn();

      offeringModule.getEvent = jest.fn();

      statisticsModule.getLeagueTableStatistics = jest.fn();

      console.warn = jest.fn((msg) => {
         return msg;
      });
   });

   it('handles Kambi API returning incorrect response for eventsByFilter request', () => {
      offeringModule.getEventsByFilter = jest.fn(() => new Promise(resolve => resolve(null)));

      return kambi.getData('/test/filter')
         .catch(e => expect(e).toMatchSnapshot());
   });

   it('handles Kambi API returning empty events set', () => {
      offeringModule.getEventsByFilter = jest.fn(() => new Promise(resolve => resolve({ events: [] })));

      return kambi.getData('/test/filter', 123)
         .catch(e => expect(e).toMatchSnapshot());
   });

   it('fails to fetch event proper getting title from event third path', () => {
      offeringModule.getEventsByFilter = jest.fn(() => {
         return new Promise((resolve) => {
            resolve({
               events: [
                  {
                     event: {
                        id: 111,
                        path: [
                           {
                              name: 'path1'
                           },
                           {
                              name: 'path2'
                           },
                           {
                              name: 'path3'
                           },
                        ],
                        type: 'ET_COMPETITION'
                     },
                     betOffers: [
                        {
                           criterion: {
                              id: 123
                           }
                        }
                     ]
                  }
               ]
            })
         });
      });

      offeringModule.getEvent = jest.fn(() => {
         return new Promise((resolve, reject) => {
            reject();
         })
      });

      const leagueTableStatisticsMock = {
         leagueTableRows: [
            {
               goalsFor: 100,
               goalsAgainst: 200
            }
         ]
      };

      statisticsModule.getLeagueTableStatistics = jest.fn((filter) => {
         expect(filter).toEqual('/test/filter');
         return new Promise(resolve => resolve(leagueTableStatisticsMock));
      });

      return kambi.getData('/test/filter', 123)
         .then((data) => {
            expect(data).toMatchSnapshot();
            expect(offeringModule.getEventsByFilter).toHaveBeenCalledTimes(1);
            expect(statisticsModule.getLeagueTableStatistics).toHaveBeenCalledTimes(1);
            expect(offeringModule.getEvent).toHaveBeenCalledTimes(1);
         })
   });


   it('handles Kambi API returning empty response for getEvent request', () => {
      const eventMock = { event: { id: 100, type: 'ET_COMPETITION' } };

      offeringModule.getEventsByFilter = jest.fn(() => new Promise(resolve => resolve({events: [eventMock]})));

      offeringModule.getEvent = jest.fn(eventId => null);

      return kambi.getData('/test/filter')
         .catch(e => expect(e).toMatchSnapshot());
   });

   it('returns correct data when criterionId is given', () => {
      const eventMock = {
         event: { id: 100, type: 'ET_COMPETITION' },
         betOffers: [ {
            criterion: { id: 123 },
            outcomes: [ { participantId: 1000 } ]
         } ]
      };

      const leagueTableStatisticsMock = { leagueTableRows: [ {
         goalsFor: 100,
         goalsAgainst: 200,
         participantId: 1000
      } ] };

      offeringModule.getEventsByFilter = jest.fn((filter) => {
         expect(filter).toEqual('test/filter/all/all/competitions');
         return new Promise(resolve => resolve({events: [eventMock]}));
      });

      offeringModule.getEvent = jest.fn((eventId) => {
         expect(eventId).toEqual(eventMock.event.id);
         return Promise.resolve(eventMock);
      });

      statisticsModule.getLeagueTableStatistics = jest.fn((filter) => {
         expect(filter).toEqual('/test/filter');
         return new Promise(resolve => resolve(leagueTableStatisticsMock));
      });

      return kambi.getData('/test/filter', 123)
         .then(data => {
            expect(data).toMatchSnapshot();
            expect(offeringModule.getEventsByFilter).toHaveBeenCalledTimes(1);
            expect(offeringModule.getEvent).toHaveBeenCalledTimes(1);
            expect(statisticsModule.getLeagueTableStatistics).toHaveBeenCalledTimes(1);
         })
   });

   it('returns correct data when criterionId is not given', () => {
      const eventMock = {
         event: { id: 100, type: 'ET_COMPETITION' }
      };

      const leagueTableStatisticsMock = { leagueTableRows: [ {
         goalsFor: 100,
         goalsAgainst: 200
      } ] };

      offeringModule.getEventsByFilter = jest.fn((filter) => {
         expect(filter).toEqual('test/filter/all/all/competitions');
         return new Promise(resolve => resolve({events: [eventMock]}));
      });

      offeringModule.getEvent = jest.fn((eventId) => {
         expect(eventId).toEqual(eventMock.event.id);
         return eventMock;
      });

      statisticsModule.getLeagueTableStatistics = jest.fn((filter) => {
         expect(filter).toEqual('/test/filter');
         return new Promise(resolve => resolve(leagueTableStatisticsMock));
      });

      return kambi.getData('/test/filter')
         .then(data => {
            expect(data).toMatchSnapshot();
            expect(offeringModule.getEventsByFilter).toHaveBeenCalledTimes(1);
            expect(offeringModule.getEvent).toHaveBeenCalledTimes(0);
            expect(statisticsModule.getLeagueTableStatistics).toHaveBeenCalledTimes(1);
         })
   });

});
