import { createSlice } from "@reduxjs/toolkit"

const notificationSlice = createSlice({
  name: 'notification',
  initialState: "Initial state",
  reducers: {
    addNotification(state, action) {
      const content = action.payload
      console.log('action: ', content)
      return content
    },
    removeNotification() {
      return ''
    }
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions

export const setNotification = (content, timeout) => {
  return async dispatch => {
    dispatch(addNotification(content))
    setTimeout(() => {
      dispatch(removeNotification())
    }, timeout ? timeout : 5000);
  }
}

export default notificationSlice.reducer