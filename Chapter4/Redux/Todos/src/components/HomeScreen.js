/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, { Component } from 'react';
import {
  StyleSheet,
  View,
  Text,
  TextInput,
  Button,
  CheckBox,
  FlatList,
} from 'react-native';

import {
  Colors,
} from 'react-native/Libraries/NewAppScreen';

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    return (
      <View>
          <View style={styles.inputForm}>
            <Text>Task:</Text>
            <TextInput placeholder='type the task you want to do'
              onChangeText={(text) => this.setState({text})}
            ></TextInput>
            <Button title='Save'
              style={styles.formButon}
              onPress={()=>{
                this.props.onAddTodo(this.state.text)
              }}
            ></Button>
          </View>
          <View style={styles.inputForm}>
            <Text>The list of tasks: </Text>
            <FlatList
              data={this.props.todos}
              renderItem={({item}) => {
                return (
                  <View style={styles.todoItem}>
                    <CheckBox value={item.completed}></CheckBox>
                    <Text> {item.text} </Text>
                  </View>
                )
              }
            }
            />
          </View>
      </View>
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
});
