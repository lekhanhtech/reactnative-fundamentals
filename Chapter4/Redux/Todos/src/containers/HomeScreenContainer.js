import { connect} from 'react-redux'
import { HomeScreen } from '../components'
import {store} from '../store'
import { 
    addTodo,
    toggleTodo,
    setVisibilityFilter,
} from '../store/actions'

function onAddTodo(dispatch, text) {
    dispatch(addTodo(text))
}

function onToggleTodo(dispatch, index) {
    dispatch(toggleTodo(index))
}

function onSetVisibilityFilter(dispatch, filter) {
    dispatch(setVisibilityFilter(filter))
}

const mapStateToProps = (state) => ({
  todos: state.app.todos,
  visibilityFilter: state.app.visibilityFilter
})

const mapDispatchToProps = (dispatch, ownProps) => ({
    onAddTodo: (text) => onAddTodo(dispatch, text),
    onToggleTodo: (index) => onToggleTodo(dispatch, index),
    onSetVisibilityFilter: (filter) => onSetVisibilityFilter(dispatch, filter),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
