import { configureStore} from "@reduxjs/toolkit"

import notificationReducer from "./reducers/notificationReducer"
import blogReducer from "./reducers/blogReducer"
import currentUserReducer from './reducers/currentUserReducer'

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    currentUser: currentUserReducer
  }
})

export default store