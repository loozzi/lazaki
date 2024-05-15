import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
  user: any
}

const initialState: AuthState = {
  isAuthenticated: false,
  user: null
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
      state.user = null
    },
    signInFailed: (state) => {
      state.isAuthenticated = false
      state.user = null
    }
  }
})

export const authActions = authSlice.actions

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated
export const selectUser = (state: { auth: AuthState }) => state.auth.user

const authReducer = authSlice.reducer
export default authReducer
