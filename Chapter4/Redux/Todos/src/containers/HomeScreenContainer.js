import { connect} from 'react-redux'
import { HomeScreen } from '../components'
import {store} from '../store'
import { 
    addTodo,
    toggeTodo,
    setVisibilityFilter,
} from '../store/actions'

function onAddTodo(dispatch, text) {
    dispatch(addTodo(text))
}

function onToggeTodo(dispatch, index) {
    dispatch(toggeTodo(index))
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
    onToggeTodo: (index) => onToggeTodo(dispatch, index),
    onSetVisibilityFilter: (filter) => onSetVisibilityFilter(dispatch, filter),
})

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(HomeScreen)
