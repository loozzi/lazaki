import { PayloadAction, createSlice } from '@reduxjs/toolkit'
import { Cart, CartItem } from '~/models/order'

interface OrderState {
  cart: Cart
}

const initialState: OrderState = {
  cart: {
    cartItems: []
  }
}

const orderSlice = createSlice({
  name: 'order',
  initialState,
  reducers: {
    addToCart: (state, action: PayloadAction<CartItem>) => {
      const index = state.cart.cartItems.findIndex((item) => item.variationId === action.payload.variationId)
      if (index !== -1) {
        state.cart.cartItems[index].quantity += action.payload.quantity
      } else {
        state.cart.cartItems.push(action.payload)
      }
    },
    removeFromCart: (state, action: PayloadAction<number>) => {
      state.cart.cartItems = state.cart.cartItems.filter((item) => item.variationId !== action.payload)
    },
    changeQuantity: (state, action: PayloadAction<{ variationId: number; quantity: number }>) => {
      const index = state.cart.cartItems.findIndex((item) => item.variationId === action.payload.variationId)
      if (index !== -1) {
        state.cart.cartItems[index].quantity = action.payload.quantity
      }
    },
    setCart: (state, action: PayloadAction<Cart>) => {
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
