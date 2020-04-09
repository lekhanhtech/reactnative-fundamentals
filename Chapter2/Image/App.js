import React, { Component } from 'react';
import { View, Image, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  stretch: {
    width: 50,
    height: 200,
    resizeMode: 'stretch'
  }
});

export default class DisplayAnImage extends Component {
  render() {
    return (
      <View style={{marginTop: 44}}>
        <Image
          style={{width: 50, height: 50}}
          source={require('./assets/react-native-logo.png')}
        />
        <Image
          style={{width: 50, height: 50}}
          source={{uri: 'https://reactnative.dev/img/tiny_logo.png'}}
        />
        <Image
          style={styles.stretch}
          source={require('./assets/react-native-logo.png')}
        />
      </View>
    )
  }
}