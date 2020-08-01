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
import { store } from '../store'

export default class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      text: '',
    };
  }

  render() {
    let filteredData = this.props.todos;
    if(this.props.visibilityFilter!=='SHOW_ALL')
    {
      filteredData = filteredData.filter((item) => (item.completed==false))
    }
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
            <View style={{flexDirection: 'row'}}>
              <CheckBox value={store.getState().app.visibilityFilter === 'SHOW_ALL'}
                onValueChange={(selected) => {
                  const filter = selected? 'SHOW_ALL': 'SHOW_NOT_COMPLETED';
                  console.log('selected:', selected)
                  this.props.onSetVisibilityFilter(filter);
                }}
              ></CheckBox>
              <Text>Show All</Text>
            </View>
            <Text>The list of tasks: </Text>
            <FlatList
              data={filteredData}
              renderItem={({item}) => {
                return (
                  <View style={styles.todoItem}>
                    <CheckBox value={item.completed}
                      onValueChange={(selected) => {
                        const index = this.props.todos.indexOf(item);
                        if(index>=0) {
                          this.props.onToggleTodo(index);
                        }
                      }}
                    ></CheckBox>
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
