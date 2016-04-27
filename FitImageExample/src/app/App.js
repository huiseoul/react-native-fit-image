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
    </ScrollView>
  );
}

export default App;
