/* eslint-env jest */
import React, { Children } from 'react';
import TableHeadDesktop from '../../../src/js/Components/TableHeadDesktop/TableHeadDesktop';
import ReactTestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('TableHeadDesktop DOM rendering', () => {

   it('renders correctly', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadDesktop
            title="Test title"
            columns={[{name: 'Test column 1', short: 'TC1'}]}
         />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});
