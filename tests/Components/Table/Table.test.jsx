/* eslint-env jest */
import React, { Children } from 'react';
import Table from '../../../src/js/Components/Table/Table';
import ReactTestUtils from 'react-addons-test-utils';

let renderer;

describe('Table DOM rendering', () => {
   beforeEach(() => {
      renderer = ReactTestUtils.createRenderer();
   });

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
