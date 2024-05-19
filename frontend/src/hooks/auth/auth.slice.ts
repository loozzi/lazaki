import { createSlice } from '@reduxjs/toolkit'
import { User } from '~/models/user'

interface AuthState {
  isAuthenticated: boolean
  userInfo: User | null
}

const initialState: AuthState = {
  isAuthenticated: false,
  userInfo: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    signIn: (state) => {
      state.isAuthenticated = true
    },
    signOut: (state) => {
      state.isAuthenticated = false
    },
    signInFailed: (state) => {
      state.isAuthenticated = false
    },
    setUserInfo: (state, action) => {
      state.userInfo = action.payload
    }
  }
})

export const authActions = authSlice.actions

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectUserInfo = (state: { auth: AuthState }) => state.auth.userInfo

const authReducer = authSlice.reducer
export default authReducer
