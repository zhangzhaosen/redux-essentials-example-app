import { configureStore } from '@reduxjs/toolkit'

import postReducer from '../features/posts/postsSlice'
import usersReducer from '../features/users/usersSlice'

import notificationsSlice from '../features/notifications/notificationsSlice'

export default configureStore({
  
      reducer:{
        posts: postReducer, 
        users: usersReducer, 
        notifications:notificationsSlice
      }

    }
)
