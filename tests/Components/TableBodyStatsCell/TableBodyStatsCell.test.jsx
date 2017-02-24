/* eslint-env jest */
import React, { Children } from 'react';
import TableBodyStatsCell from '../../../src/js/Components/TableBodyStatsCell/TableBodyStatsCell';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('kambi-widget-core-library', () => ({
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   }
}));

describe('TableBodyStatsCell DOM rendering', () => {

   it('renders correctly without value', () => {
      const tree = ReactTestRenderer.create(
         <TableBodyStatsCell column={{name: 'Test stat name', className: 'test-stat-name'}} />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

   it('renders correctly with value', () => {
      const tree = ReactTestRenderer.create(
         <TableBodyStatsCell column={{name: 'Test stat name', className: 'test-stat-name'}}>5</TableBodyStatsCell>
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});
