import { PayloadAction } from '@reduxjs/toolkit'
import { call, takeLatest } from 'redux-saga/effects'
import { CartItem, OrderCreatePayload, OrderUpdatePayload } from '~/models/order'
import { IResponse } from '~/models/response'
import orderService from '~/services/order.service'
import { orderActions } from './order.slice'

function* addToCart(actions: PayloadAction<CartItem>) {
  const payload: OrderCreatePayload = {
    productId: actions.payload.productId!,
    variationId: actions.payload.variationId!,
    quantity: actions.payload.quantity,
    orderId: actions.payload.orderId === 0 ? undefined : actions.payload.orderId
  }
  const response: IResponse<CartItem> = yield call(orderService.add, payload)
  if (response.status === 200) orderActions.addToCart(response.data!)
}

function* removeFromCart(actions: PayloadAction<number>) {
  const response: IResponse<any> = yield call(orderService.remove, actions.payload)
  if (response.status !== 200) orderActions.removeFromCart(actions.payload)
}

function* changeQuantity(actions: PayloadAction<OrderUpdatePayload>) {
  const response: IResponse<CartItem> = yield call(orderService.update, actions.payload)
  orderActions.changeQuantity(response.data!)
}

export default function* orderSaga() {
  yield takeLatest(orderActions.addToCart.type, addToCart)
  yield takeLatest(orderActions.removeFromCart.type, removeFromCart)
  yield takeLatest(orderActions.changeQuantity.type, changeQuantity)
}
