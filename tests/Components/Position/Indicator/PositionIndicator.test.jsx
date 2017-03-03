/* eslint-env jest */
import React, { Children } from 'react';
import PositionIndicator from '../../../../src/js/Components/Position/Indicator/PositionIndicator';
import ReactTestUtils from 'react-addons-test-utils';

const renderer = ReactTestUtils.createRenderer();

describe('PositionIndicator DOM rendering', () => {

   it('renders correctly with default props', () => {
      expect(renderer.render(
         <PositionIndicator position={1} />
      )).toMatchSnapshot();
   });

   it('renders correctly with color', () => {
      expect(renderer.render(
         <PositionIndicator position={1} color='GREEN' />
      )).toMatchSnapshot();
   });

   it('renders correctly with positive position change', () => {
      expect(renderer.render(
         <PositionIndicator position={1} change={5} />
      )).toMatchSnapshot();
   });

   it('renders correctly with negative position change', () => {
      expect(renderer.render(
         <PositionIndicator position={4} change={-2} />
      )).toMatchSnapshot();
   });

});
