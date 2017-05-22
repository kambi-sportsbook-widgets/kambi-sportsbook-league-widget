/* eslint-env jest */
import React from 'react';
import ReactShallowRenderer from 'react-test-renderer/shallow';
import TableBodyParticipantCell from '../../../src/js/Components/TableBodyParticipantCell/TableBodyParticipantCell';

let renderer;

jest.mock('kambi-widget-core-library', () => ({
   translationModule: {
      getTranslation: (key) => `Translated: "${key}"`
   }
}));

describe('TableBodyParticipantCell DOM rendering', () => {

   beforeEach(() => {
      renderer = new ReactShallowRenderer();
   });

   it('renders correctly', () => {
      expect(renderer.render(
         <TableBodyParticipantCell name="Antoni" />
      )).toMatchSnapshot();
   });

});
