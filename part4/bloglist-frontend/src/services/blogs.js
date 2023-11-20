import axios from 'axios'
const baseUrl = '/api/blogs'

let token = null

const setToken = newToken => {
  console.log('setting token', newToken)
  token = `Bearer ${newToken}`
}

const getAll = async () => {
  const response = await axios.get(baseUrl)
  return response.data
}

const addBlog = async (newBlog) => {
  console.log('token', token)
  const config = {
    headers: { Authorization: token }, }
  console.log(config)
  const response = await axios.post(baseUrl, newBlog, config)
  console.log('response', response.data)
  return response.data
}

const updateBlog = async (updatedBlog) => {
  const config = {
    headers: { Authorization: token }, }
  console.log(config)
  const response = await axios.put(`${baseUrl}/${updatedBlog.id}`, updatedBlog, config)
  console.log('response', response.data)
  return response.data
}

const deleteBlog = async (blog) => {
  console.log('deleting ', blog)
  const config = {
    headers: { Authorization: token }, }
  console.log('config in deleteblog',config)
  const response = await axios.delete(`${baseUrl}/${blog.id}`, config)
  console.log('response in deleteblog', response.data)
  return response.data
}

export default {
  getAll,
  addBlog,
  setToken,
  updateBlog,
  deleteBlog
}