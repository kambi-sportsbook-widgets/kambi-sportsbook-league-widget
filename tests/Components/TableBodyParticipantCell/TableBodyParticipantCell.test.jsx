/* eslint-env jest */
import React, { Children } from 'react';
import TableBodyParticipantCell from '../../../src/js/Components/TableBodyParticipantCell/TableBodyParticipantCell';

import ReactTestUtils from 'react-addons-test-utils';

let renderer;

jest.mock('kambi-widget-core-library', () => ({
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   }
}));

describe('TableBodyParticipantCell DOM rendering', () => {
   beforeEach(() => {
      renderer = ReactTestUtils.createRenderer();
   });

   it('renders correctly', () => {
      expect(renderer.render(
         <TableBodyParticipantCell name="Antoni" />
      )).toMatchSnapshot();
   });

});
