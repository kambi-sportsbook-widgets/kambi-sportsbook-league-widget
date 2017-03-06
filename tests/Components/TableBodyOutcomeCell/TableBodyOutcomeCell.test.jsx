/* eslint-env jest */
import React, { Children } from 'react';
import TableBodyOutcomeCell from '../../../src/js/Components/TableBodyOutcomeCell/TableBodyOutcomeCell';
import ReactTestUtils from 'react-addons-test-utils';

let renderer;

describe('TableBodyOutcomeCell DOM rendering', () => {
   beforeEach(() => {
      renderer = ReactTestUtils.createRenderer();
   });

   it('renders correctly without children', () => {
      expect(renderer.render(
         <TableBodyOutcomeCell />
      )).toMatchSnapshot();
   });

   it('renders correctly with children', () => {
      expect(renderer.render(
         <TableBodyOutcomeCell>
            <div>Test</div>
         </TableBodyOutcomeCell>
      )).toMatchSnapshot();
   });

});
