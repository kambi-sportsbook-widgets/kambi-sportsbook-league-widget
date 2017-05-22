/* eslint-env jest */
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TableBody from '../../../src/js/Components/TableBody/TableBody';

let renderer;

describe('TableBody DOM rendering', () => {

   beforeEach(() => {
      renderer = new ReactShallowRenderer();
   });

   it('renders correctly without children', () => {
      expect(renderer.render(
         <TableBody />
      )).toMatchSnapshot();
   });

   it('renders correctly with children', () => {
      expect(renderer.render(
         <TableBody>
            <tr><td/><td/></tr>
            <tr><td/><td/></tr>
         </TableBody>
      )).toMatchSnapshot();
   });

});
