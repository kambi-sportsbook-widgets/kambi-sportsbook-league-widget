/* eslint-env jest */
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Legend from '../../../src/js/Components/Legend/Legend';
import PositionCircle from '../../../src/js/Components/Position/Circle/PositionCircle';

let renderer;

describe('Legend DOM rendering', () => {

   beforeEach(() => {
      renderer = new ReactShallowRenderer();
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
