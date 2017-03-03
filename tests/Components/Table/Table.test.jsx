/* eslint-env jest */
import React, { Children } from 'react';
import Table from '../../../src/js/Components/Table/Table';
import ReactTestUtils from 'react-addons-test-utils';

const renderer = ReactTestUtils.createRenderer();

describe('Table DOM rendering', () => {

   it('renders correctly without children', () => {
      expect(renderer.render(
         <Table />
      )).toMatchSnapshot();
   });

   it('renders correctly with children', () => {
      expect(renderer.render(
         <Table>
            <tr><td /><td /></tr>
            <tr><td /><td /></tr>
         </Table>
      )).toMatchSnapshot();
   });

});
