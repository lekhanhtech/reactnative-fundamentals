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
  Text,
  StatusBar,
  TextInput,
  Button,
  CheckBox,
  FlatList,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/lib/integration/react'
import { store, persistor } from './store'
import {
  HomeScreenContainer,
} from './containers'

export default class App extends Component {

  constructor(props) {
    super(props);
  }
  render() {
    return (
      <>
        <StatusBar barStyle="dark-content" />
        <Provider store={store}>
          <PersistGate loading={(<Text>Loading</Text>)} persistor={persistor}>
            <SafeAreaView>
              <HomeScreenContainer />
            </SafeAreaView>
          </PersistGate>
        </Provider>
      </>
    );
  }
};

const styles = StyleSheet.create({
  inputForm: {
    backgroundColor: Colors.lighter,
    borderRadius: 1,
    flexDirection: 'column',
    padding: 5,
    backgroundColor: Colors.white,
    margin: 5,
    alignContent: 'flex-start',
    alignItems: 'flex-start',
     
  },
  formButon: {
    backgroundColor: Colors.blue,
    paddingStart: 10
  },
  todoItem: {
    flexDirection: 'row',
    padding: 5
  },
  engine: {
    position: 'absolute',
    right: 0,
  },
  body: {
    backgroundColor: Colors.white,
  },
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '600',
    color: Colors.black,
  },
  sectionDescription: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
  highlight: {
    fontWeight: '700',
  },
  footer: {
    color: Colors.dark,
    fontSize: 12,
    fontWeight: '600',
    padding: 4,
    paddingRight: 12,
    textAlign: 'right',
  },
});
