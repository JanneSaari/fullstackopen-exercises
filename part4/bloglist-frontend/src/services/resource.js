import axios from 'axios'

const useResource = (baseUrl) => {
  let token = null
  const loggedUserJSON = window.localStorage.getItem('loggedAppUser')
  if (loggedUserJSON) {
    const user = JSON.parse(loggedUserJSON)
    token = `Bearer ${user.token}`
  }

  const setToken = (newToken) => {
    console.log('setting token', newToken)
    token = `Bearer ${newToken}`
  }

  const getAll = async () => {
    const response = await axios.get(baseUrl)
    return response.data
  }

  const addNew = async (newResource) => {
    const config = {
      headers: { Authorization: token },
    }
    console.log('adding: ', newResource)
    const response = await axios.post(baseUrl, newResource, config)
    console.log('response', response.data)
    return response.data
  }

  const update = async (updated) => {
    const config = {
      headers: { Authorization: token },
    }
    console.log(config)
    const response = await axios.put(
      `${baseUrl}/${updated.id}`,
      updated,
      config,
    )
    console.log('response', response.data)
    return response.data
  }

  const remove = async (resource) => {
    console.log('deleting ', resource)
    const config = {
      headers: { Authorization: token },
    }
    const response = await axios.delete(`${baseUrl}/${resource.id}`, config)
    return response.data
  }

  return {
    setToken,
    getAll,
    addNew,
    update,
    remove,
  }
}

export default useResource