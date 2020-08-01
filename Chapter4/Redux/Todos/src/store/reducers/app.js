import { handleActions } from 'redux-actions'
import initState from '../initState'
import {
  addTodo, 
  toggeTodo, 
  setVisibilityFilter,
} from '../actions'

export default handleActions({
  [addTodo]: (state, { payload: { text } }) => ({
    ...state,
    todos: state.todos.concat([{ text, completed: false }])
  }),
  [toggeTodo]: (state, { payload: { idx } }) => {
    const todos = state.todos.map((todo, index) =>
        idx === index
          ? { text: todo.text, completed: !todo.completed }
          : todo
      );
    return ({
      ...state,
      todos
    })
  },
  [setVisibilityFilter]: (state, { payload: { filter } }) => ({
    ...state,
    visibilityFilter: filter
  }),
}, initState.app)
