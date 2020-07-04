/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { useEffect } from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
} from 'react-native';

import {
  Header,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import remoteConfig from '@react-native-firebase/remote-config';

async function fetchRemoveConfig() {
  await remoteConfig().setConfigSettings({
    isDeveloperModeEnabled: true,
  });
  console.log('fetchAndActivate');
  try {
    const activated = await remoteConfig().fetchAndActivate();
    console.log('activated:', activated);
  } catch (error) {
    console.error('error:', error);
  }
  
  
}
const App: () => React$Node = () => {
  useEffect(() => {
    remoteConfig()
      .setDefaults({
        show_a: 'true',
        show_b: 'true',
      })
      .then(() => {
        console.log('Default values set.');
        fetchRemoveConfig();
      });
  }, []);

  const {show_a, show_b} = remoteConfig().getAll();
  console.log('show_a:', show_a);
  console.log('show_b:', show_b);

  return (
    <>
      <StatusBar barStyle="dark-content" />
      <SafeAreaView>
        <ScrollView
          contentInsetAdjustmentBehavior="automatic"
          style={styles.scrollView}>
          <Header />
          {global.HermesInternal == null ? null : (
            <View style={styles.engine}>
              <Text style={styles.footer}>Engine: Hermes</Text>
            </View>
          )}
          <View style={styles.body}>
            {
              (show_a.value)? (
                <Button title='Feature A' ></Button>
              ):null
            }
            
            {
              (show_b.value)? (
                <Button title='Feature B' ></Button>
              ):null
            }
          </View>
        </ScrollView>
      </SafeAreaView>
    </>
  );
};

const styles = StyleSheet.create({
  scrollView: {
    backgroundColor: Colors.lighter,
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

export default App;
