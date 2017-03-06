/* eslint-env jest */
import React, { Children } from 'react';
import TableHeadDefaultRow from '../../../src/js/Components/TableHeadDefaultRow/TableHeadDefaultRow';
import ReactTestUtils from 'react-addons-test-utils';

let renderer;

jest.mock('kambi-widget-core-library', () => ({
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   }
}));

describe('TableHeadDefaultRow DOM rendering', () => {
   beforeEach(() => {
      renderer = ReactTestUtils.createRenderer();
   });

   it('renders correctly when not collapsable', () => {
      expect(renderer.render(
         <TableHeadDefaultRow columns={[{name: 'Test column 1', short: 'TC1'}]} collapsable={false} />
      )).toMatchSnapshot();
   });

   it('renders correctly when collapsable', () => {
      expect(renderer.render(
         <TableHeadDefaultRow columns={[{name: 'Test column 1', short: 'TC1'}]} collapsable={true} />
      )).toMatchSnapshot();
   });

   it('renders correctly with title', () => {
      expect(renderer.render(
         <TableHeadDefaultRow
            columns={[{name: 'Test column 1', short: 'TC1'}]}
            collapsable={true}
            title="Test title"
         />
      )).toMatchSnapshot();
   });

   it('renders correctly in hidden mode', () => {
      expect(renderer.render(
         <TableHeadDefaultRow
            columns={[{name: 'Test column 1', short: 'TC1'}]}
            collapsable={true}
            hiddenMode={true}
         />
      )).toMatchSnapshot();
   });

   it('renders correctly without columns', () => {
      expect(renderer.render(
         <TableHeadDefaultRow
            columns={[]}
            collapsable={true}
         />
      )).toMatchSnapshot();
   });

   it('renders correctly with many columns', () => {
      expect(renderer.render(
         <TableHeadDefaultRow
            columns={[{name: 'Test column 1', short: 'TC1'}, {name: 'Test column 2', short: 'TC2'}]}
            collapsable={true}
         />
      )).toMatchSnapshot();
   });

});
