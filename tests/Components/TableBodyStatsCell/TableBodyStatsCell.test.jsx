/* eslint-env jest */
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TableBodyStatsCell from '../../../src/js/Components/TableBodyStatsCell/TableBodyStatsCell';

let renderer;

jest.mock('kambi-widget-core-library', () => ({
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   }
}));

describe('TableBodyStatsCell DOM rendering', () => {

   beforeEach(() => {
      renderer = new ReactShallowRenderer();
   });

   it('renders correctly without value', () => {
      expect(renderer.render(
         <TableBodyStatsCell column={{name: 'Test stat name', className: 'test-stat-name'}} />
      )).toMatchSnapshot();
   });

   it('renders correctly with value', () => {
      expect(renderer.render(
         <TableBodyStatsCell column={{name: 'Test stat name', className: 'test-stat-name'}}>5</TableBodyStatsCell>
      )).toMatchSnapshot();
   });

});
