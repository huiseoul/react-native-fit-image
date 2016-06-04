# React Native Fit Image [![npm version](https://badge.fury.io/js/react-native-fit-image.svg)](https://badge.fury.io/js/react-native-fit-image)
React Native Fit Image enables you to draw responsive image component.

## Introduction
Responsive image component to fit perfectly itself.

## Install
`npm install react-native-fit-image --save`

## Usage
```javascript
// custom styles for FitImage
var styles = StyleSheet.create({
  fitImage: {
    borderRadius: 20,
  },
});

// draws image to fit inherited space automatically, even when screen is rotated.
// even you don't need to provide original size in v1.2.0
<FitImage
  source={{ uri: 'http://facebook.github.io/react/img/logo_og.png' }}
  style={styles.fitImage}
/>

// draws image to fit inherited space automatically, even when screen is rotated.
<FitImage
  source={{ uri: 'http://facebook.github.io/react/img/logo_og.png' }}
  originalWidth={400}
  originalHeight={400}
  style={styles.fitImage}
/>

// or draws image to specific size like Image component.
<FitImage
  source={{ uri: 'http://facebook.github.io/react/img/logo_og.png' }}
  width={200}
  height={200}
  style={styles.fitImage}
/>
```

## Example
- See a [FitImageExample][1].

![FitImageExample - Portrait](https://github.com/originerd/react-native-fit-image-example/blob/master/fit_image_example_portrait.gif)
![FitImageExample - LandScape](https://github.com/originerd/react-native-fit-image-example/blob/master/fit_image_example_landscape.gif)

[1]: https://github.com/huiseoul/react-native-fit-image-example
