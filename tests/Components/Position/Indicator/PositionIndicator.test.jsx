/* eslint-env jest */
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import PositionIndicator from '../../../../src/js/Components/Position/Indicator/PositionIndicator';

let renderer;

describe('PositionIndicator DOM rendering', () => {

   beforeEach(() => {
      renderer = new ReactShallowRenderer();
   });

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
