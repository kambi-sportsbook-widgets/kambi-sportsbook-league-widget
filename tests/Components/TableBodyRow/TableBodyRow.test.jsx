/* eslint-env jest */
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TableBodyRow from '../../../src/js/Components/TableBodyRow/TableBodyRow';

let renderer;

describe('TableBodyRow DOM rendering', () => {

   beforeEach(() => {
      renderer = new ReactShallowRenderer();
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
