/* eslint-env jest */
import React, { Children } from 'react';
import TableBody from '../../../src/js/Components/TableBody/TableBody';
import ReactTestRenderer from 'react-test-renderer';

describe('TableBody DOM rendering', () => {

   it('renders correctly without children', () => {
      const tree = ReactTestRenderer.create(
         <TableBody />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with children', () => {
      const tree = ReactTestRenderer.create(
         <TableBody>
            <tr><td/><td/></tr>
            <tr><td/><td/></tr>
         </TableBody>
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});
