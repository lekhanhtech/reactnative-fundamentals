/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react'
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
} from 'react-native';

import { Colors } from 'react-native/Libraries/NewAppScreen'

const Realm = require('realm')

// Define your models and their properties
const CarSchema = {
  name: 'Car',
  properties: {
    make:  'string',
    model: 'string',
    miles: {type: 'int', default: 0},
  }
}
const PersonSchema = {
  name: 'Person',
  properties: {
    name:     'string',
    birthday: 'date',
    cars:     'Car[]', // a list of Cars
    picture:  'data?'  // optional property
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { realm: null }
  }

  componentDidMount() {
    Realm.open({
      schema: [CarSchema, PersonSchema]
    }).then(realm => {
      // Create Realm objects and write to local storage
      realm.write(() => {
        const myCar = realm.create('Car', {
          make: 'Honda',
          model: 'Civic',
          miles: 1000,
        })
        myCar.miles += 20 // Update a property value
      })

      // Query Realm for all cars with a high mileage
      const cars = realm.objects('Car').filtered('miles > 1000')

      // Will return a Results object with our 1 car
      console.log(cars.length) // => 1

      // Add another car
      realm.write(() => {
        const myCar = realm.create('Car', {
          make: 'Ford',
          model: 'Focus',
          miles: 2000,
        })
      })

      // Query results are updated in realtime
      console.log(cars.length) // => 2
      this.setState({ realm })
    });
  }

  componentWillUnmount() {
    // Close the realm if there is one open.
    const {realm} = this.state
    if (realm !== null && !realm.isClosed) {
      realm.close();
    }
  }

  render() {
    const info = this.state.realm
      ? 'Number of cars in this Realm: ' + this.state.realm.objects('Car').length
      : 'Loading...';

    return (
      <>
      <StatusBar barStyle="dark-content" />
        <SafeAreaView>
          <ScrollView
            contentInsetAdjustmentBehavior="automatic"
            style={styles.scrollView}>
            <View style={styles.body}>
              <Text style={styles.description}>
                {info}
              </Text>
            </View>
          </ScrollView>
        </SafeAreaView>
      </>
    );
  }
}

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
  },
  body: {
    backgroundColor: Colors.white,
  },
  description: {
    marginTop: 8,
    fontSize: 18,
    fontWeight: '400',
    color: Colors.dark,
  },
})
