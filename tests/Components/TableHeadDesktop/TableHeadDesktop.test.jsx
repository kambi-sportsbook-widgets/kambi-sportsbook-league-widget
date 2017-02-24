/* eslint-env jest */
import React, { Children } from 'react';
import TableHeadDesktop from '../../../src/js/Components/TableHeadDesktop/TableHeadDesktop';
import ReactTestRenderer from 'react-test-renderer';
import { shallow } from 'enzyme';

describe('TableHeadDesktop DOM rendering', () => {

   it('renders correctly when not collapsable', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadDesktop
            title="Test title"
            columns={[{name: 'Test column 1', short: 'TC1'}]}
            onHeadClick={() => false}
            collapsable={false}
         />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly when collapsable', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadDesktop
            title="Test title"
            columns={[{name: 'Test column 1', short: 'TC1'}]}
            onHeadClick={() => false}
            collapsable={true}
         />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly when in hidden mode', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadDesktop
            title="Test title"
            columns={[{name: 'Test column 1', short: 'TC1'}]}
            onHeadClick={() => false}
            collapsable={true}
            hiddenMode={true}
         />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});

describe('TableHeadDesktop interface', () => {

   it('handles head click events correctly', () => {
      const onHeadClickMock = jest.fn();

      const wrapper = shallow(
         <TableHeadDesktop
            title="Test title"
            columns={[{name: 'Test column 1', short: 'TC1'}]}
            onHeadClick={onHeadClickMock}
            collapsable={true}
         />
      );

      expect(onHeadClickMock).not.toHaveBeenCalled();

      wrapper.first().simulate('click');

      expect(onHeadClickMock).toHaveBeenCalledTimes(1);
   });

});
