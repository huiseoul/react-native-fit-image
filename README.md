# React Native Fit Image [![npm version](https://badge.fury.io/js/react-native-fit-image.svg)](https://badge.fury.io/js/react-native-fit-image)
React Native Fit Image enables you to draw responsive image component.

## Introduction
Responsive image component to fit perfectly itself.

## Install
`npm install react-native-fit-image --save`

## Usage
```javascript
import FitImage from 'react-native-fit-image';

// custom styles for FitImage
var styles = StyleSheet.create({
  fitImage: {
    borderRadius: 20,
  },
  fitImageWithSize: {
    height: 100,
    width: 30,
  },
});

// draws image to fit inherited space automatically, even when screen is rotated.
// even you don't need to provide original size in v1.2.0
<FitImage
  source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
  style={styles.fitImage}
/>

// draws image to fit inherited space automatically and disables loading indicator
<FitImage
  indicator={false} // disable loading indicator
  indicatorColor="white" // react native colors or color codes like #919191
  indicatorSize="large" // (small | large) or integer
  source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
  style={styles.fitImage}
/>

// draws image to fit inherited space automatically, even when screen is rotated.
<FitImage
  source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
  originalWidth={400}
  originalHeight={400}
  style={styles.fitImage}
/>

// could use resizeMode
<FitImage
  resizeMode="contain"
  source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
/>

// or draws image to specific size like Image component.
<FitImage
  source={{ uri: 'https://facebook.github.io/react-native/docs/assets/favicon.png' }}
  style={styles.fitImageWithSize}
/>

// draws local image (currently, it does not support responsive)
<FitImage
  source={require('fit-image.png')}
  style={styles.fitImageWithSize}
/>
```

## Example
- See a [FitImageExample][1].

![FitImageExample - Portrait](https://github.com/originerd/react-native-fit-image-example/raw/master/fit_image_example_portrait.gif)
![FitImageExample - LandScape](https://github.com/originerd/react-native-fit-image-example/raw/master/fit_image_example_landscape.gif)

[1]: https://github.com/originerd/react-native-fit-image-example
