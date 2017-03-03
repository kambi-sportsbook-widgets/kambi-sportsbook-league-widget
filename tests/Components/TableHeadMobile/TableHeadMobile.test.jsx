/* eslint-env jest */
import React, { Children } from 'react';
import TableHeadMobile from '../../../src/js/Components/TableHeadMobile/TableHeadMobile';
import { mount, shallow } from 'enzyme';
import ReactTestUtils from 'react-addons-test-utils';

const renderer = ReactTestUtils.createRenderer();

jest.mock('kambi-widget-core-library', () => ({
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   }
}));

const columnGroups = [
   {
      id: 'cg1',
      title: 'Column group 1',
      columns: [
         {name: 'Column 1-1', short: 'c11'},
         {name: 'Column 1-2', short: 'c12'}
      ]
   },
   {
      id: 'cg2',
      title: 'Column group 2',
      columns: [
         {name: 'Column 2-1', short: 'c21'},
         {name: 'Column 2-2', short: 'c22'}
      ]
   }
];

describe('TableHeadMobile DOM rendering', () => {

   it('renders correctly', () => {
      const tree = renderer.render(
         <TableHeadMobile
            title="Test title"
            columnGroups={columnGroups}
            onColumnGroupChanged={() => false}
            showColumnPicker={true}
         />
      );

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly when showColumnPicker is false', () => {
      const tree = renderer.render(
         <TableHeadMobile
            title="Test title"
            columnGroups={columnGroups}
            onColumnGroupChanged={() => false}
            showColumnPicker={false}
         />
      );

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with initial column group specified', () => {
      const tree = renderer.render(
         <TableHeadMobile
            title="Test title"
            columnGroups={columnGroups}
            onColumnGroupChanged={() => false}
            initialColumnGroupIdx={1}
            showColumnPicker={true}
         />
      );

      expect(tree).toMatchSnapshot();
   });

});

describe('TableHeadMobile interface', () => {

   it('handles onColumnGroupChange events correctly', () => {
      const onColumnGroupChangedMock = jest.fn(),
         clickEvMock = { stopPropagation: jest.fn() };

      const wrapper = mount(
         <table>
            <TableHeadMobile
               title="Test title"
               columnGroups={columnGroups}
               onColumnGroupChanged={onColumnGroupChangedMock}
               showColumnPicker={true}
            />
         </table>
      );

      wrapper.find('button').simulate('click', clickEvMock);

      const eventMock = new Event('click');
      Object.defineProperty(
         eventMock,
         'target',
         {
            value: wrapper.find('li[data-kw-dropdown-button-index=1]').node,
            enumerable: true
         }
      );

      expect(onColumnGroupChangedMock).not.toHaveBeenCalled();

      window.document.documentElement.dispatchEvent(eventMock);

      expect(onColumnGroupChangedMock).toHaveBeenCalledTimes(1);
      expect(onColumnGroupChangedMock).toHaveBeenCalledWith(1);
   });

});
