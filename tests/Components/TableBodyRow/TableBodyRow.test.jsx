/* eslint-env jest */
import React, { Children } from 'react';
import TableBodyRow from '../../../src/js/Components/TableBodyRow/TableBodyRow';
import ReactTestUtils from 'react-addons-test-utils';

let renderer;

describe('TableBodyRow DOM rendering', () => {
   beforeEach(() => {
      renderer = ReactTestUtils.createRenderer();
   });

   it('renders correctly without children', () => {
      expect(renderer.render(
         <TableBodyRow />
      )).toMatchSnapshot();
   });

   it('renders correctly with children', () => {
      expect(renderer.render(
         <TableBodyRow>
            <td/><td/>
         </TableBodyRow>
      )).toMatchSnapshot();
   });

});
