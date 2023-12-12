import { createSlice } from "@reduxjs/toolkit"

const filterSlice = createSlice({
  name: 'filter',
  initialState: '',
  reducers: {
    setFilter(state, action) {
      console.log('action: ', action)
      console.log('state: ', state)
      return action.payload
    }
  },
})

export const { setFilter } = filterSlice.actions
export default filterSlice.reducer