import { createSlice } from "@reduxjs/toolkit"
import blogs from "../services/blogs"

const blogSlice = createSlice({
  name: 'blogs',
  initialState: [],
  reducers: {
    setBlogs(state, action){
      return action.payload
    },
    appendBlog(state, action){
      state.push(action.payload)
    }
  },
})

export const { setBlogs, appendBlog } = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    console.log('getting blogs...')
    const content = await blogs.getAll()
    dispatch(setBlogs(content))
    console.log('blogs set: ', content)
  }
}

export const addBlog = (newBlog) => {
  return async dispatch => {
    const resp = await blogs.addBlog(newBlog)
    console.log('resp: ', resp)
    dispatch(appendBlog(resp))
  }
}

export default blogSlice.reducer