import React, {
  Component,
  ScrollView,
  StyleSheet,
} from 'react-native';

import FitImage from 'react-native-fit-image';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 20,
  },
  imageRounded: {
    borderRadius: 20,
    marginTop: 20,
  },
});

function App() {
  return (
    <ScrollView style={styles.container}>
      { /* Style none */ }
      <FitImage
        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
        originalWidth={400}
        originalHeight={400}
      />

      { /* Rounded */ }
      <FitImage
        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
        originalWidth={400}
        originalHeight={400}
        style={styles.imageRounded}
      />
    </ScrollView>
  );
}

export default App;
