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
    },
    setBlog(state, action){
      console.log('state: ', state)
      const id = action.payload.id
      const blogToUpdate = state.find(blog =>
        blog.id === id)
      const updatedBlog = { ...action.payload }
      return state.map(blog => {
        return blog.id !== id ? blog : updatedBlog
      })
    }
  },
})

export const { setBlogs, appendBlog, setBlog } = blogSlice.actions

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
export const updateBlog = (updatedBlog) => {
  console.log('before dispatch')
  return async dispatch => {
    const resp = await blogs.updateBlog(updatedBlog)
    console.log('dispatching', resp)
    dispatch(setBlog(resp))
  }
}

export default blogSlice.reducer