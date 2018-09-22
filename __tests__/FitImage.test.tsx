import 'react-native';

import * as React from 'react';

import FitImage from '../src/FitImage';

import { create } from 'react-test-renderer';

describe('FitImage', () => {
  const source = { uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' };

  it('renders without errors', () => {
    const result = create(
      <FitImage source={source} />,
    ).toJSON();

    expect(result).toMatchSnapshot();
  });

  describe('when styles.width is given without styles.height', () => {
    it('throws an error', () => {
      try {
        // tslint:disable-next-line:no-unused-expression
        <FitImage source={source} style={{ width: 100 }} />;
      } catch (error) {
        expect(error.message)
          .toThrowError('Props error: size props must be present none or both of width and height.');
      }
    });
  });
  describe('when styles.height is given without styles.width', () => {
    it('throws an error', () => {
      try {
        // tslint:disable-next-line:no-unused-expression
        <FitImage source={source} style={{ height: 100 }} />;
      } catch (error) {
        expect(error.message)
          .toThrowError('Props error: size props must be present none or both of width and height.');
      }
    });
  });
  describe('when originalWidth is given without originalHeight', () => {
    it('throws an error', () => {
      try {
        // tslint:disable-next-line:no-unused-expression
        <FitImage source={source} originalWidth={100} />;
      } catch (error) {
        expect(error.message)
          .toThrowError('Props error: size props must be present none or both of width and height.');
      }
    });
  });
  describe('when originalHeight is given without originalWidth', () => {
    it('throws an error', () => {
      try {
        // tslint:disable-next-line:no-unused-expression
        <FitImage source={source} originalHeight={100} />;
      } catch (error) {
        expect(error.message)
          .toThrowError('Props error: size props must be present none or both of width and height.');
      }
    });
  });
});
