/* eslint-env jest */
import React, { Children } from 'react';
import LeagueTableWidget from '../../src/js/Components/LeagueTableWidget';
import PositionCircle from '../../src/js/Components/Position/Circle/PositionCircle';
import { mount, shallow } from 'enzyme';
import { widgetModule } from 'kambi-widget-core-library';
import ReactTestRenderer from 'react-test-renderer';
import ReactTestUtils from 'react-addons-test-utils';

const renderer = ReactTestUtils.createRenderer();

jest.mock('kambi-widget-core-library', () => ({
   eventsModule: {
      subscribe: jest.fn(),
      unsubscribe: jest.fn()
   },
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   },
   widgetModule: {
      adaptWidgetHeight: jest.fn(),
      get betslipIds() { return []; }
   },
   utilModule: {
      getOddsDecimalValue: jest.fn(_ => _.toFixed(1)),
      getOutcomeLabel: jest.fn(() => 'Outcome label from util')
   },
   coreLibrary: {
      config: {
         get oddsFormat() { return 'decimal'; }
      }
   }
}));

const statisticsMock = [
   {
      position: 1,
      participantName: 'FC Pęzino',
      gamesPlayed: 1,
      wins: 1,
      draws: 1,
      losses: 1,
      goalsFor: 1,
      goalsAgainst: 1,
      goalsDifference: 1,
      points: 1,
      outcomes: [
         {
            id: 1,
            odds: 1001,
            oddsFractional: '1.1',
            oddsAmerican: '1.1',
            betOfferId: 101
         },
         {
            id: 2,
            odds: 1002,
            oddsFractional: '1.2',
            oddsAmerican: '1.2',
            betOfferId: 102
         }
      ]
   },
   {
      position: 2,
      participantName: 'Błękitni Stargard',
      gamesPlayed: 2,
      wins: 2,
      draws: 2,
      losses: 2,
      goalsFor: 2,
      goalsAgainst: 2,
      goalsDifference: 2,
      points: 2,
      outcomes: [
         null,
         {
            id: 4,
            odds: 1004,
            oddsFractional: '1.4',
            oddsAmerican: '1.4',
            betOfferId: 104
         }
      ]
   }
];

const betOffersMock = [
   {betOfferType: {name: 'Test BetOffer 1'}},
   {betOfferType: {name: 'Test BetOffer 2'}}
];

describe('LeagueTableWidget DOM rendering', () => {
   beforeEach(() => {
      window.innerWidth = 1024;
   });

   it('renders correctly with no data', () => {
      const tree = renderer.render(
         <LeagueTableWidget
            statistics={[]}
            betOffers={[]}
            title='League Table'
         />
      );

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly without bet offers', () => {
      const tree = renderer.render(
         <LeagueTableWidget
            statistics={statisticsMock}
            betOffers={[]}
            title='League Table'
         />
      );

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with bet offers', () => {
      const tree = renderer.render(
         <LeagueTableWidget
            statistics={statisticsMock}
            betOffers={betOffersMock}
            title='League Table'
         />
      );

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly in mobile mode', () => {
      const tmpInnerWidth = window.innerWidth;
      window.innerWidth = 480;

      const tree = renderer.render(
         <LeagueTableWidget
            statistics={statisticsMock}
            betOffers={betOffersMock}
            title='League Table'
         />
      );

      expect(tree).toMatchSnapshot();

      window.innerWidth = tmpInnerWidth;
   });

   it('renders correctly with title extracted from event\'s path (3 parts)', () => {
      const tree = renderer.render(
         <LeagueTableWidget
            statistics={statisticsMock}
            betOffers={betOffersMock}
            event={{event: {path: [{name: 'p1'}, {name: 'p2'}, {name: 'p3'}]}}}
            title='League Table'
         />
      );

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with title extracted from event\'s path (2 parts)', () => {
      const tree = renderer.render(
         <LeagueTableWidget
            statistics={statisticsMock}
            betOffers={betOffersMock}
            event={{event: {path: [{name: 'p1'}, {name: 'p2'}]}}}
            title='League Table'
         />
      );

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with title extracted from event\'s path (0 parts)', () => {
      const tree = renderer.render(
         <LeagueTableWidget
            statistics={statisticsMock}
            betOffers={betOffersMock}
            event={{event: {path: []}}}
            title='League Table'
         />
      );

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with position legend', () => {
      const tree = renderer.render(
         <LeagueTableWidget
            statistics={statisticsMock}
            betOffers={betOffersMock}
            positionLegend={[{color: PositionCircle.COLORS.GREEN, description: 'Test legend description'}]}
            title='League Table'
         />
      );

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with custom position color matcher', () => {
      const positionColorMatcherMock = jest.fn(position => Object.keys(PositionCircle.COLORS)[position]);

      const tree = renderer.render(
         <LeagueTableWidget
            statistics={statisticsMock}
            betOffers={betOffersMock}
            positionColorMatcher={positionColorMatcherMock}
            title='League Table'
         />
      );

      expect(positionColorMatcherMock).toHaveBeenCalledTimes(2);

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly after switching to mobile mode', () => {
      // using ReactTestRenderer to test interactions
      // ReactTestRenderer does deep rendering
      // ReactTestUtils does not actually mount the object, so it does not work for this test
      const tree = ReactTestRenderer.create(
         <LeagueTableWidget
            statistics={[]}
            betOffers={[]}
            title='League Table'
         />
      );

      expect(tree).toMatchSnapshot();

      const tmpInnerWidth = window.innerWidth;
      window.innerWidth = 480;

      window.dispatchEvent(new Event('resize'));

      window.innerWidth = tmpInnerWidth;

      expect(tree).toMatchSnapshot();
   });

});

describe('LeagueTableWidget interface', () => {

   it('unmounts correctly', () => {
      const wrapper = mount(
         <LeagueTableWidget
            statistics={[]}
            betOffers={[]}
            title='League Table'
         />
      );
      wrapper.unmount();
   });

   it('setups correctly when receives new props', () => {
      const wrapper = mount(
         <LeagueTableWidget
            statistics={[]}
            betOffers={[]}
            title='League Table'
         />
      );

      widgetModule.adaptWidgetHeight.mockClear();
      wrapper.setProps({ title: 'Test title' });
      expect(widgetModule.adaptWidgetHeight).toHaveBeenCalledTimes(1);
      widgetModule.adaptWidgetHeight.mockClear();
   });

   it('handles columns group change events correctly', () => {
      const clickEvMock = { stopPropagation: jest.fn() };

      const tmpInnerWidth = window.innerWidth;
      window.innerWidth = 480;

      const wrapper = mount(
         <LeagueTableWidget
            statistics={statisticsMock}
            betOffers={betOffersMock}
            title='League Table'
         />
      );

      wrapper.find('TableHeadMobile button').simulate('click', clickEvMock);

      const eventMock = new Event('click');
      Object.defineProperty(
         eventMock,
         'target',
         {
            value: wrapper.find('li[data-kw-dropdown-button-index=1]').node,
            enumerable: true
         }
      );

      expect(wrapper.debug()).toMatchSnapshot();

      window.document.documentElement.dispatchEvent(eventMock);

      expect(wrapper.debug()).toMatchSnapshot();

      window.innerWidth = tmpInnerWidth;
   });

});
