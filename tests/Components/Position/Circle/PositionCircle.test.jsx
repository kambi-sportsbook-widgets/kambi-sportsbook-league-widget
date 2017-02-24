/* eslint-env jest */
import React, { Children } from 'react';
import PositionCircle from '../../../../src/js/Components/Position/Circle/PositionCircle';
import ReactTestRenderer from 'react-test-renderer';

describe('PositionCircle DOM rendering', () => {

   it('renders correctly with default props', () => {
      const tree = ReactTestRenderer.create(
         <PositionCircle/>
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with given color', () => {
      const tree = ReactTestRenderer.create(
         <PositionCircle color={PositionCircle.COLORS.GREEN} />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with transparent color', () => {
      const tree = ReactTestRenderer.create(
         <PositionCircle color={PositionCircle.COLORS.TRANSPARENT} />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with given child element', () => {
      const tree = ReactTestRenderer.create(
         <PositionCircle>t</PositionCircle>
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});
