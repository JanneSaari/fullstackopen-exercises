import { createSlice } from "@reduxjs/toolkit"
import login from "../services/login"

const userSlice = createSlice({
  name: 'user',
  initialState: '',
  reducers: {
    setUser(state, action){
      return action.payload
    }
  }

})

export const { setUser } = userSlice.actions
export default userSlice.reducer