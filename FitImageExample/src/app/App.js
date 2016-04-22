import React, {
  Component,
  StyleSheet,
  View
} from 'react-native';

import FitImage from 'react-native-fit-image';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5FCFF',
  },
  fitImage: {
    borderRadius: 20,
  }
});

function App() {
  return (
    <View style={styles.container}>
      <FitImage
        source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
        originalWidth={400}
        originalHeight={400}
        style={styles.fitImage}
      />
    </View>
  );
}

export default App;
