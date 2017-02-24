/* eslint-env jest */
import React, { Children } from 'react';
import TableHeadMobile from '../../../src/js/Components/TableHeadMobile/TableHeadMobile';
import ReactTestRenderer from 'react-test-renderer';
import { mount, shallow } from 'enzyme';

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

   it('renders correctly when not collapsable', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadMobile
            title="Test title"
            columnGroups={columnGroups}
            onHeadClick={() => false}
            onColumnGroupChanged={() => false}
            collapsable={true}
         />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly when collapsable', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadMobile
            title="Test title"
            columnGroups={columnGroups}
            onHeadClick={() => false}
            onColumnGroupChanged={() => false}
            collapsable={false}
         />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly when in hidden mode', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadMobile
            title="Test title"
            columnGroups={columnGroups}
            onHeadClick={() => false}
            onColumnGroupChanged={() => false}
            collapsable={true}
            hiddenMode={true}
         />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with initial column group specified', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadMobile
            title="Test title"
            columnGroups={columnGroups}
            onHeadClick={() => false}
            onColumnGroupChanged={() => false}
            collapsable={true}
            initialColumnGroupIdx={1}
         />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});

describe('TableHeadMobile interface', () => {

   it('handles head click events correctly', () => {
      const onHeadClickMock = jest.fn();

      const wrapper = shallow(
         <TableHeadMobile
            title="Test title"
            columnGroups={columnGroups}
            onHeadClick={onHeadClickMock}
            onColumnGroupChanged={() => false}
            collapsable={true}
            hiddenMode={true}
         />
      );

      expect(onHeadClickMock).not.toHaveBeenCalled();

      wrapper.first().simulate('click');

      expect(onHeadClickMock).toHaveBeenCalledTimes(1);
   });

   it('handles onColumnGroupChange events correctly', () => {
      const onColumnGroupChangedMock = jest.fn(),
         clickEvMock = { stopPropagation: jest.fn() };

      const wrapper = mount(
         <table>
            <TableHeadMobile
               title="Test title"
               columnGroups={columnGroups}
               onHeadClick={() => false}
               onColumnGroupChanged={onColumnGroupChangedMock}
               collapsable={true}
               hiddenMode={false}
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
