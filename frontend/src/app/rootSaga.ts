import { all } from 'redux-saga/effects'
import authSaga from '~/hooks/auth/auth.saga'
import orderSaga from '~/hooks/order/order.saga'

export default function* rootSaga() {
  yield all([authSaga(), orderSaga()])
}
