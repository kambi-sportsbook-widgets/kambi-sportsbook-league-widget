/* eslint-env jest */
import React, { Children } from 'react';
import PositionIndicator from '../../../../src/js/Components/Position/Indicator/PositionIndicator';
import ReactTestRenderer from 'react-test-renderer';

describe('PositionIndicator DOM rendering', () => {

   it('renders correctly with default props', () => {
      const tree = ReactTestRenderer.create(
         <PositionIndicator position={1} />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with color', () => {
      const tree = ReactTestRenderer.create(
         <PositionIndicator position={1} color="GREEN" />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with positive position change', () => {
      const tree = ReactTestRenderer.create(
         <PositionIndicator position={1} change={5} />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with negative position change', () => {
      const tree = ReactTestRenderer.create(
         <PositionIndicator position={4} change={-2} />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});
