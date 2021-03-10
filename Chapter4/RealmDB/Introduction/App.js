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
  Button,
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
    cars:     'Car[]', // a list of Cars
    picture:  'data?'  // optional property
  }
}

export default class App extends Component {
  constructor(props) {
    super(props);
    this.state = { 
      realm: null,
      person: [],
    }
  }

  componentDidMount() {
    Realm.open({
      schema: [CarSchema, PersonSchema],
      deleteRealmIfMigrationNeeded: true
    }).then(realm => {

      this.setState({realm})
    });
  }

  componentWillUnmount() {
    // Close the realm if there is one open.
    const {realm} = this.state
    if (realm !== null && !realm.isClosed) {
      realm.close();
    }
  }

  createPerson () {
    if(this.state.realm) {
      // Add persons and their cars
      this.state.realm.write(() => {
          let john = realm.create('Person', {name: 'John', cars: []});
          john.cars.push({make: 'Honda',  model: 'Accord', miles: 1500});
          john.cars.push({make: 'Toyota', model: 'Prius',  miles: 2780});

          let joan = realm.create('Person', {name: 'Joan', cars: []});
          joan.cars.push({make: 'Skoda', model: 'Octavia', miles: 1120});
          joan.cars.push({make: 'Ford',  model: 'Fiesta',  miles: 95});
          joan.cars.push({make: 'VW',    model: 'Golf',    miles: 1270});

          let jill = realm.create('Person', {name: 'Jill', cars: []});

          let jack = realm.create('Person', {name: 'Jack', cars: []});
          jack.cars.push({make: 'Porche', model: '911',    miles: 965});
      });
    }
  }

  queryWhoHaveCars() {
    // Find car owners
    if(this.state.realm) {
      let carOwners = this.state.realm.objects('Person').filtered('cars.@size > 0');
      console.log('Car owners')
      this.setState({person:carOwners})
    }  
  }

  queryWhoDriveMoreThanAverage() {
    // Find who has been driver longer than average
    if(this.state.realm) {
      let average = this.state.realm.objects('Car').avg('miles');
      let longerThanAverage = this.state.realm.objects('Person').filtered('cars.@sum.miles > $0', average);
      this.setState({person:longerThanAverage})
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
            style={styles.scrollView}>
           <View>
              <Button title="Who have cars?"
                onPress={()=>{this.queryWhoHaveCars()}}
              />
              <Button title="Who drive more than average?"
                onPress={()=>{this.queryWhoDriveMoreThanAverage()}}
              />
            </View>
            <View>
              {
                this.state.person?(
                  this.state.person.map((p, index) => (
                    <View>
                      <Text>{p.name}</Text>
                      {
                        p.cars?(
                          p.cars.map(c => (
                            <View>
                              <Text>Make: {c.make}</Text>
                              <Text>Model:{c.model}</Text>
                              <Text>Mile:{c.mile}</Text>
                            </View>
                          ))
                        ):null
                      }
                    </View>
                  ))
                ):null
              }
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
