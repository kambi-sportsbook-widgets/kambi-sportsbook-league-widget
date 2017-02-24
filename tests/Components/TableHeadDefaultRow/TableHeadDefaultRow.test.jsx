/* eslint-env jest */
import React, { Children } from 'react';
import TableHeadDefaultRow from '../../../src/js/Components/TableHeadDefaultRow/TableHeadDefaultRow';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('kambi-widget-core-library', () => ({
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   }
}));

describe('TableHeadDefaultRow DOM rendering', () => {

   it('renders correctly when not collapsable', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadDefaultRow columns={[{name: 'Test column 1', short: 'TC1'}]} collapsable={false} />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly when collapsable', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadDefaultRow columns={[{name: 'Test column 1', short: 'TC1'}]} collapsable={true} />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with title', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadDefaultRow
            columns={[{name: 'Test column 1', short: 'TC1'}]}
            collapsable={true}
            title="Test title"
         />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly in hidden mode', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadDefaultRow
            columns={[{name: 'Test column 1', short: 'TC1'}]}
            collapsable={true}
            hiddenMode={true}
         />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly without columns', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadDefaultRow
            columns={[]}
            collapsable={true}
         />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with many columns', () => {
      const tree = ReactTestRenderer.create(
         <TableHeadDefaultRow
            columns={[{name: 'Test column 1', short: 'TC1'}, {name: 'Test column 2', short: 'TC2'}]}
            collapsable={true}
         />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});
