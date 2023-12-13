import { createSlice } from "@reduxjs/toolkit"

const getId = () => (100000 * Math.random()).toFixed(0)
const initialState = [
  {content: 'Initial State', id: getId()},
  {content: 'Qweqwe', id: getId()}
]

const notificationSlice = createSlice({
  name: 'notification',
  initialState: initialState,
  reducers: {
    addNotification(state, action) {
      const notification = {
        content: action.payload,
        id: getId()
      }
      state.push(notification)
    },
    removeNotification(state, action) {
      const idToRemove = action.payload
      // console.log(JSON.parse(JSON.stringify(state)))
      // console.log('id ', idToRemove)
      const indexToRemove = state.findIndex(notification => {
        const notificationId = JSON.parse(JSON.stringify(notification))
        // console.log('notification ', notification)
        // console.log('notificationId ', notificationId)
        return notificationId.id === idToRemove})
      console.log(indexToRemove)
      if(indexToRemove >= 0)
        state.splice(indexToRemove, 1)
    }
  },
})

export const { addNotification, removeNotification } = notificationSlice.actions
export default notificationSlice.reducer