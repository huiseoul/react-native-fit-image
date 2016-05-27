import test from 'tape';
import React from 'react';
import {
  Image,
} from 'react-native';
import { shallow } from 'enzyme';

import FitImage from '../src/FitImage';

test('FitImage', nest => {
  const setup = () => {
    const source = { uri: 'http://facebook.github.io/react/img/logo_og.png' };
    const props = { source };
    const wrapper = shallow(<FitImage {...props} />);

    return { wrapper, props };
  };

  nest.test('...render', assert => {
    const { wrapper } = setup();

    assert.true(wrapper.is(Image), 'Image');

    assert.end();
  });
});
