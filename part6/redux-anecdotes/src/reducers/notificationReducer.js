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
    removeNotification(state) {
      return ''
    }
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer