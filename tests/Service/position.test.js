/* eslint-env jest */

import position from '../../src/js/Service/position';

const supportedLeagueFilters = [
   '/football/england/premier_league',
   '/football/germany/bundesliga',
   '/football/spain/laliga',
   '/football/italy/serie_a',
   '/football/france/ligue_1',
   '/football/netherlands/eredivisie'
];

describe('position service', () => {

   it('all leagues are correctly configured', () => {
      return Promise.all(supportedLeagueFilters.map(filter => position.getLegend(filter)))
         .then(legends => expect(legends).toMatchSnapshot());
   });

   it('behaves correctly when league config wasn\'t found', () => {
      return position.getLegend('/non/existent/league')
         .then(legend => expect(legend).toHaveLength(0));
   });

   it('returns position color matcher correctly', () => {
      return Promise.all(supportedLeagueFilters.map(filter => position.getColorMatcher(filter)))
         .then(matchers => expect(matchers.map(matcher => [matcher(1), matcher(-1)])).toMatchSnapshot())
   });

});
