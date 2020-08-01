import { createStore } from 'redux'
import { persistStore, persistReducer } from 'redux-persist'
import AsyncStorage from '@callstack/async-storage'

import rootReducer from './reducers'

// Redux persist
const persistConfig = {
  key: 'root',
  storage: AsyncStorage,
}
const persistedReducer = persistReducer(persistConfig, rootReducer)

// Creates the Redux store using our reducer and the logger and saga middlewares
export const store = createStore(persistedReducer)
export const persistor = persistStore(store)
