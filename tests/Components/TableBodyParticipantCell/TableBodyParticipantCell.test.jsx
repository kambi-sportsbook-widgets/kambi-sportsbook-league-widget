/* eslint-env jest */
import React, { Children } from 'react';
import TableBodyParticipantCell from '../../../src/js/Components/TableBodyParticipantCell/TableBodyParticipantCell';
import ReactTestRenderer from 'react-test-renderer';

jest.mock('kambi-widget-core-library', () => ({
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   }
}));

describe('TableBodyParticipantCell DOM rendering', () => {

   it('renders correctly', () => {
      const tree = ReactTestRenderer.create(
         <TableBodyParticipantCell name="Antoni" />
      ).toJSON();

      expect(tree).toMatchSnapshot();
   });

});
