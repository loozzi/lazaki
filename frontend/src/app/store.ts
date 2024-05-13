import createSagaMiddleware from '@redux-saga/core'
import { combineReducers, configureStore } from '@reduxjs/toolkit'
import rootSaga from './rootSaga'
import orderReducer from '~/hooks/order/order.slice'

const sagaMiddleware = createSagaMiddleware()

const rootReducer = combineReducers({
  order: orderReducer
})

export const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      thunk: true
    }).concat(sagaMiddleware)
})

sagaMiddleware.run(rootSaga)
