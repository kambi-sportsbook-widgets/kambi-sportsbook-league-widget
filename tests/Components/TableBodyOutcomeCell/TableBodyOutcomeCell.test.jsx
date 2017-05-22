/* eslint-env jest */
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TableBodyOutcomeCell from '../../../src/js/Components/TableBodyOutcomeCell/TableBodyOutcomeCell';

let renderer;

describe('TableBodyOutcomeCell DOM rendering', () => {

   beforeEach(() => {
      renderer = new ReactShallowRenderer();
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
