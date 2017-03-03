/* eslint-env jest */
import React, { Children } from 'react';
import TableBodyPositionCell from '../../../src/js/Components/TableBodyPositionCell/TableBodyPositionCell';
import ReactTestUtils from 'react-addons-test-utils';

const renderer = ReactTestUtils.createRenderer();

jest.mock('kambi-widget-core-library', () => ({
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   }
}));

describe('TableBodyPositionCell DOM rendering', () => {

   it('renders correctly', () => {
      expect(renderer.render(
         <TableBodyPositionCell>
            <div>Test</div>
         </TableBodyPositionCell>
      )).toMatchSnapshot();
   });

});
