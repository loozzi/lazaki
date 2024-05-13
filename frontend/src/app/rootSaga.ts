import { all } from 'redux-saga/effects'
import orderSaga from '~/hooks/order/order.saga'

export default function* rootSaga() {
  yield all([orderSaga()])
}
