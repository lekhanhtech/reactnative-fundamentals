import { createActions } from 'redux-actions'

const {
  addTodo,
  toggeTodo,
  setVisibilityFilter,
} = createActions({
  ADD_TODO: (text) => ({ text }),
  TOGGLE_TODO: (index) => ({ idx: index }),
  SET_VISIBILITY_FILTER: (filter) => ({ filter }),
}, {
  prefix: 'app'
})

export {
  addTodo,
  toggeTodo,
  setVisibilityFilter,
}
