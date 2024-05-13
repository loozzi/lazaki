import { takeLatest } from 'redux-saga/effects'
import { orderActions } from './order.slice'
import { PayloadAction } from '@reduxjs/toolkit'
import { CartItem } from '~/models/order'

function* addToCart(actions: PayloadAction<CartItem>) {
  orderActions.addToCart(actions.payload)
}

function* removeFromCart(actions: PayloadAction<number>) {
  orderActions.removeFromCart(actions.payload)
}

function* changeQuantity(actions: PayloadAction<{ variationId: number; quantity: number }>) {
  orderActions.changeQuantity(actions.payload)
}

export default function* orderSaga() {
  yield takeLatest(orderActions.addToCart.type, addToCart)
  yield takeLatest(orderActions.removeFromCart.type, removeFromCart)
  yield takeLatest(orderActions.changeQuantity.type, changeQuantity)
}
