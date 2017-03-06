/* eslint-env jest */
import React, { Children } from 'react';
import Legend from '../../../src/js/Components/Legend/Legend';
import PositionCircle from '../../../src/js/Components/Position/Circle/PositionCircle';
import ReactTestUtils from 'react-addons-test-utils';

let renderer;

describe('Legend DOM rendering', () => {
   beforeEach(() => {
      renderer = ReactTestUtils.createRenderer();
   });

   it('renders correctly with empty items list', () => {
      expect(renderer.render(
         <Legend items={[]} />
      )).toMatchSnapshot();
   });

   it('renders correctly with items', () => {
      const items = Object.keys(PositionCircle.COLORS).map((color, i) => ({color, description: `${i}th item`}));

      expect(renderer.render(
         <Legend items={items} />
      )).toMatchSnapshot();
   });

});
