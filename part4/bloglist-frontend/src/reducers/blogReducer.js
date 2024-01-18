import { createSlice } from '@reduxjs/toolkit'
import useResource from '../services/resource'

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
    const blogs = useResource('/api/blogs')
    const content = await blogs.getAll()
    dispatch(setBlogs(content))
  }
}

export const addBlog = (newBlog) => {
  return async dispatch => {
    const blogs = useResource('/api/blogs')
    const resp = await blogs.addNew(newBlog)
    dispatch(appendBlog(resp))
  }
}
export const updateBlog = (updatedBlog) => {
  return async dispatch => {
    const blogs = useResource('/api/blogs')
    const resp = await blogs.update(updatedBlog)
    console.log('response: ', resp)
    dispatch(setBlog(resp))
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    const blogs = useResource('/api/blogs')
    const resp = await blogs.remove(blog)
    dispatch(removeBlog(blog))
  }
}

export const addComment = (comment, blog) => {
  return async dispatch => {
    const comments = useResource(`/api/blogs/${blog.id}/comments`)
    console.log('comment:', comment)
    console.log('blog', blog)
    const resp = await comments.addNew({ comment })
    console.log('comment resp: ', resp)
    let updatedBlog = { ...blog }
    const updatedComments = [ ...updatedBlog.comments, comment]
    updatedBlog.comments = updatedComments
    console.log('updatedBlog: ', updatedBlog)
    dispatch(setBlog(updatedBlog))
  }
}

export default blogSlice.reducer