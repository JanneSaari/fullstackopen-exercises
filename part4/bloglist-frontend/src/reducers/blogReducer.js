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
    },
    removeBlog(state, action){
      const index = state.findIndex(n => n.id === action.payload.id)
      return state.toSpliced(index, 1)
    }
  },
})

export const {
  setBlogs,
  appendBlog,
  setBlog,
  removeBlog
} = blogSlice.actions

export const initializeBlogs = () => {
  return async dispatch => {
    const content = await blogs.getAll()
    dispatch(setBlogs(content))
  }
}

export const addBlog = (newBlog) => {
  return async dispatch => {
    const resp = await blogs.addBlog(newBlog)
    dispatch(appendBlog(resp))
  }
}
export const updateBlog = (updatedBlog) => {
  return async dispatch => {
    const resp = await blogs.updateBlog(updatedBlog)
    dispatch(setBlog(resp))
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    const resp = await blogs.deleteBlog(blog)
    dispatch(removeBlog(blog))
  }
}

export default blogSlice.reducer