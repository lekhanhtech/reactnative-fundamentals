/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  View,
  StatusBar,
  Button,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import ToastExample from './ToastExample';
import Random from './Random';
import ImagePicker from './ImagePicker';
import { NativeEventEmitter, NativeModules } from 'react-native';

export default class App extends Component {

  async divideByRandomAsync() {
    try {
      var {divisor, result} = await Random.divideByRandomPromises(5,3)
      console.log('5/' + divisor + ' = ' + result);
    } catch (e) {
      console.error(e);
    }
  }

  async pickImage() {
    try {
      var uri = await ImagePicker.pickImage()
  
      console.log(uri + ': ' + uri)
    } catch (e) {
      console.error(e)
    }
  }

  componentDidMount() {
    const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
    eventEmitter.addListener('EventShowToast', (event) => {
       console.log(event) // "someValue"
    })
  }

  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <SafeAreaView style={{flex:1}}>
          <View
            style={styles.container}>
            <Button onPress={() => {
                ToastExample.show('Awesome', ToastExample.SHORT);
                }}
                title="Show a toast"
            />

            <Button onPress={() => {
                Random.divideByRandomWithCallbacks(5,3,
                  (error) => {
                    ToastExample.show(error, ToastExample.SHORT);
                  },
                  (divisor, result) => {
                    ToastExample.show(`5/${divisor} = ${result}`, ToastExample.SHORT);
                  }
                  )
                }}
                title="Devide by random"
            />

            <Button onPress={() => { this.divideByRandomAsync(5,3,) }}
                title="Devide by random async"
            />

            <Button onPress={() => { this.pickImage() }}
                title="Pick image"
            />
          </View>
        </SafeAreaView>
      </>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: Colors.lighter,
    justifyContent: 'center'
  },
});