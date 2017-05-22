/* eslint-env jest */
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import PositionCircle from '../../../../src/js/Components/Position/Circle/PositionCircle';

let renderer;

describe('PositionCircle DOM rendering', () => {

   beforeEach(() => {
      renderer = new ReactShallowRenderer();
   });

   it('renders correctly with default props', () => {
      expect(renderer.render(
         <PositionCircle />
      )).toMatchSnapshot();
   });

   it('renders correctly with given color', () => {
      expect(renderer.render(
         <PositionCircle color='GREEN' />
      )).toMatchSnapshot();
   });

   it('renders correctly with transparent color', () => {
      expect(renderer.render(
         <PositionCircle color='TRANSPARENT' />
      )).toMatchSnapshot();
   });

   it('renders correctly with given child element', () => {
      expect(renderer.render(
         <PositionCircle>t</PositionCircle>
      )).toMatchSnapshot();
   });

});
