import { createStore } from 'redux';
import todos from './reducers/todo';
import  visibilityFilter from './reducers/filter';

const reducer = combineReducers({ visibilityFilter, todos })
const store = createStore(reducer)