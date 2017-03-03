/* eslint-env jest */
import React, { Children } from 'react';
import PositionCircle from '../../../../src/js/Components/Position/Circle/PositionCircle';
import ReactTestUtils from 'react-addons-test-utils';

const renderer = ReactTestUtils.createRenderer();

describe('PositionCircle DOM rendering', () => {

   it('renders correctly with default props', () => {
      expect(renderer.render(
         <PositionCircle />
      )).toMatchSnapshot();
   });

   it('renders correctly with given color', () => {
      expect(renderer.render(
         <PositionCircle color={PositionCircle.COLORS.GREEN} />
      )).toMatchSnapshot();
   });

   it('renders correctly with transparent color', () => {
      expect(renderer.render(
         <PositionCircle color={PositionCircle.COLORS.TRANSPARENT} />
      )).toMatchSnapshot();
   });

   it('renders correctly with given child element', () => {
      expect(renderer.render(
         <PositionCircle>t</PositionCircle>
      )).toMatchSnapshot();
   });

});
