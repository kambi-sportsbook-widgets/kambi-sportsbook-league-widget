/* eslint-env jest */
import React, { Children } from 'react';
import TableHeadDesktop from '../../../src/js/Components/TableHeadDesktop/TableHeadDesktop';
import ReactTestUtils from 'react-addons-test-utils';

let renderer;

describe('TableHeadDesktop DOM rendering', () => {
   beforeEach(() => {
      renderer = ReactTestUtils.createRenderer();
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
