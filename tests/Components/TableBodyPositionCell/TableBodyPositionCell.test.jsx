/* eslint-env jest */
import React, { Children } from 'react';
import TableBodyPositionCell from '../../../src/js/Components/TableBodyPositionCell/TableBodyPositionCell';
import ReactTestUtils from 'react-addons-test-utils';

let renderer;

jest.mock('kambi-widget-core-library', () => ({
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   }
}));

describe('TableBodyPositionCell DOM rendering', () => {
   beforeEach(() => {
      renderer = ReactTestUtils.createRenderer();
   });

   it('renders correctly', () => {
      expect(renderer.render(
         <TableBodyPositionCell>
            <div>Test</div>
         </TableBodyPositionCell>
      )).toMatchSnapshot();
   });

});
