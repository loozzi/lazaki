import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { CartItem, OrderHistoryResponse } from '~/models/order'

interface OrderState {
  cart: OrderHistoryResponse | undefined
}

const initialState: OrderState = {
  cart: {
    id: 0,
    customerId: 0,
    status: 'order',
    orderDetails: []
  }
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const index = state.cart!.orderDetails.findIndex((item) => item.variationId === action.payload.variationId)
      if (index !== -1) {
        state.cart!.orderDetails[index].quantity += action.payload.quantity
      } else {
        state.cart!.orderDetails.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart!.orderDetails = state.cart!.orderDetails.filter((item) => item.id !== action.payload)
    },
    changeQuantity: (state, action: PayloadAction<CartItem>) => {
      const index = state.cart!.orderDetails.findIndex((item) => item.variationId === action.payload.variationId)
      if (index !== -1) {
        state.cart!.orderDetails[index].quantity = action.payload.quantity
      }
    },
    setCart: (state, action: PayloadAction<OrderHistoryResponse>) => {
      state.cart = action.payload
    }
  }
})

// Actions
export const orderActions = orderSlice.actions

// Selectors
export const selectCart = (state: { order: OrderState }) => state.order.cart

// Reducer
const orderReducer = orderSlice.reducer
export default orderReducer
