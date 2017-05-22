/* eslint-env jest */
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TableBodyPositionCell from '../../../src/js/Components/TableBodyPositionCell/TableBodyPositionCell';

let renderer;

jest.mock('kambi-widget-core-library', () => ({
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   }
}));

describe('TableBodyPositionCell DOM rendering', () => {

   beforeEach(() => {
      renderer = new ReactShallowRenderer();
   });

   it('renders correctly', () => {
      expect(renderer.render(
         <TableBodyPositionCell>
            <div>Test</div>
         </TableBodyPositionCell>
      )).toMatchSnapshot();
   });

});
