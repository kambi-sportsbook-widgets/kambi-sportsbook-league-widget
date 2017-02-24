/* eslint-env jest */
import React, { Children } from 'react';
import Legend from '../../../src/js/Components/Legend/Legend';
import PositionCircle from '../../../src/js/Components/Position/Circle/PositionCircle';
import ReactTestRenderer from 'react-test-renderer';

describe('Legend DOM rendering', () => {

   it('renders correctly with empty items list', () => {
      const tree = ReactTestRenderer.create(
         <Legend items={[]} />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with items', () => {
      const items = Object.keys(PositionCircle.COLORS).map((color, i) => ({color, description: `${i}th item`}));

      const tree = ReactTestRenderer.create(
         <Legend items={items} />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});
