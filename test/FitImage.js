import test from 'tape';
import React from 'react';
import {
  Image,
} from 'react-native';
import { shallow } from 'enzyme';

import FitImage from '../src/FitImage';

test('FitImage', nest => {
  const setup = (props = {}) => {
    const source = { uri: 'http://facebook.github.io/react/img/logo_og.png' };
    const defaultProps = { source };

    props = { ...props, ...defaultProps }
    const wrapper = shallow(<FitImage {...props} />);

    return { wrapper, props };
  };

  nest.test('...throw error on initializing', assert => {
    assert.throws(
      () => { setup({ width: 100 }); }, Error,
      'when width props exist without height'
    );

    assert.throws(
      () => { setup({ height: 100 }); }, Error,
      'when height props exist without width'
    );

    assert.throws(
      () => { setup({ originalWidth: 100 }); }, Error,
      'when originalWidth props exist without originalHeight'
    );

    assert.throws(
      () => { setup({ originalHeight: 100 }); }, Error,
      'when originalHeight props exist without originalWidth'
    );

    assert.end();
  });

  nest.test('...render', assert => {
    const { wrapper } = setup();

    assert.true(wrapper.is(Image), 'Image');

    assert.end();
  });
});
