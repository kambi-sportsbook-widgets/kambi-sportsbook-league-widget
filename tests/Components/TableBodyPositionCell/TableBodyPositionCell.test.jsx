/* eslint-env jest */
import React, { Children } from 'react';
import TableBodyPositionCell from '../../../src/js/Components/TableBodyPositionCell/TableBodyPositionCell';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('kambi-widget-core-library', () => ({
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   }
}));

describe('TableBodyPositionCell DOM rendering', () => {

   it('renders correctly', () => {
      const tree = ReactTestRenderer.create(
         <TableBodyPositionCell>
            <div>Test</div>
         </TableBodyPositionCell>
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});
