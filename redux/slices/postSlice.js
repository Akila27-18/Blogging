// redux/slices/postSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../../utils/axiosInstance'

// fetch posts
export const fetchPosts = createAsyncThunk('posts/fetchPosts', async () => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  const res = await axios.get(`${baseUrl}/api/posts`)
  return res.data
})

// delete post
export const deletePost = createAsyncThunk('posts/deletePost', async (id) => {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'
  await axios.delete(`${baseUrl}/api/posts/${id}`)
  return id
})

const postSlice = createSlice({
  name: 'posts',
  initialState: { items: [], loading: false },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchPosts.fulfilled, (state, action) => {
        state.items = action.payload
      })
      .addCase(deletePost.fulfilled, (state, action) => {
        state.items = state.items.filter((p) => p.id !== action.payload)
      })
  },
})

export default postSlice.reducer
