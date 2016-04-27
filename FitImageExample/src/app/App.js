import React, {
  Component,
  ScrollView,
  StyleSheet,
  View,
} from 'react-native';

import FitImage from 'react-native-fit-image';

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#F5FCFF',
    flex: 1,
    paddingTop: 20,
  },
  flex: {
    flex: 1,
  },
  imageRounded: {
    borderRadius: 20,
    marginTop: 20,
  },
  marginAndBorder: {
    borderColor: 'red',
    borderWidth: 2,
    margin: 20,
  },
  twoColumnsContainer: {
    flexDirection: 'row',
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

      { /* Two columns on row */ }
      <View style={styles.twoColumnsContainer}>
        <FitImage
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          originalWidth={400}
          originalHeight={400}
          style={styles.flex}
        />
        <FitImage
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          originalWidth={400}
          originalHeight={400}
          style={styles.flex}
        />
      </View>

      { /* Margin and border */ }
      <View style={styles.marginAndBorder}>
        <FitImage
          source={{uri: 'http://facebook.github.io/react/img/logo_og.png'}}
          originalWidth={400}
          originalHeight={400}
          style={styles.flex}
        />
      </View>
    </ScrollView>
  );
}

export default App;
