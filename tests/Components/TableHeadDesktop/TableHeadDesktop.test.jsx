/* eslint-env jest */
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TableHeadDesktop from '../../../src/js/Components/TableHeadDesktop/TableHeadDesktop';

let renderer;

describe('TableHeadDesktop DOM rendering', () => {

   beforeEach(() => {
      renderer = new ReactShallowRenderer();
   });

   it('renders correctly', () => {
      expect(renderer.render(
         <TableHeadDesktop
            title="Test title"
            columns={[{name: 'Test column 1', short: 'TC1'}]}
         />
      )).toMatchSnapshot();
   });

});
