/* eslint-env jest */
import React, { Children } from 'react';
import TableBody from '../../../src/js/Components/TableBody/TableBody';
import ReactTestUtils from 'react-addons-test-utils';

let renderer;

describe('TableBody DOM rendering', () => {
   beforeEach(() => {
      renderer = ReactTestUtils.createRenderer();
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
