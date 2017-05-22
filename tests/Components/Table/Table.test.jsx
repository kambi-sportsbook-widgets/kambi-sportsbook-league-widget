/* eslint-env jest */
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import Table from '../../../src/js/Components/Table/Table';

let renderer;

describe('Table DOM rendering', () => {

   beforeEach(() => {
      renderer = new ReactShallowRenderer();
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
