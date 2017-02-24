/* eslint-env jest */
import React, { Children } from 'react';
import Table from '../../../src/js/Components/Table/Table';
import ReactTestRenderer from 'react-test-renderer';

describe('Table DOM rendering', () => {

   it('renders correctly without children', () => {
      const tree = ReactTestRenderer.create(
         <Table />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with children', () => {
      const tree = ReactTestRenderer.create(
         <Table>
            <tr><td/><td/></tr>
            <tr><td/><td/></tr>
         </Table>
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});
