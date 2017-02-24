/* eslint-env jest */
import React, { Children } from 'react';
import TableBodyOutcomeCell from '../../../src/js/Components/TableBodyOutcomeCell/TableBodyOutcomeCell';
import ReactTestRenderer from 'react-test-renderer';

describe('TableBodyOutcomeCell DOM rendering', () => {

   it('renders correctly without children', () => {
      const tree = ReactTestRenderer.create(
         <TableBodyOutcomeCell />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with children', () => {
      const tree = ReactTestRenderer.create(
         <TableBodyOutcomeCell>
            <div>Test</div>
         </TableBodyOutcomeCell>
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});
