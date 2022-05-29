import { configureStore } from '@reduxjs/toolkit';

import authReducer from './auth/authSlice';
import tourReducer from './tour/tourSlice';
import userReducer from './user/userSlice';
import commentReducer from './comment/commentSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    tour: tourReducer,
    user: userReducer,
    comment: commentReducer,
  },
});

export default store;
