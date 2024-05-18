import { createSlice } from '@reduxjs/toolkit'

interface AuthState {
  isAuthenticated: boolean
}

const initialState: AuthState = {
  isAuthenticated: false
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
    }
  }
})

export const authActions = authSlice.actions

export const selectIsAuthenticated = (state: { auth: AuthState }) => state.auth.isAuthenticated

const authReducer = authSlice.reducer
export default authReducer
