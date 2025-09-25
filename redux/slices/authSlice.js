import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axiosInstance'

export const login = createAsyncThunk('auth/login', async ({ email, password }) => {
  const res = await axios.post('/auth', { email, password })
  return res.data
})

export const signup = createAsyncThunk('auth/signup', async ({ email, password }) => {
  const res = await axios.post('/auth', { email, password, signup: true })
  return res.data
})

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, status: 'idle', error: null },
  reducers: {
    logout(state) {
      state.user = null; state.token = null
      if (typeof window !== 'undefined') localStorage.removeItem('token')
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        state.status = 'succeeded'
        if (typeof window !== 'undefined') localStorage.setItem('token', JSON.stringify(action.payload.token))
      })
      .addCase(signup.fulfilled, (state, action) => {
        state.user = action.payload.user
        state.token = action.payload.token
        if (typeof window !== 'undefined') localStorage.setItem('token', JSON.stringify(action.payload.token))
      })
  }
})

export const { logout } = authSlice.actions
export default authSlice.reducer
