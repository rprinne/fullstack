import { configureStore } from "@reduxjs/toolkit";

import notificationSlice from "./slices/notificationSlice";
import blogsSlice from "./slices/blogsSlice";
import userSlice from "./slices/userSlice";

export const store = configureStore({
  reducer: {
    notification: notificationSlice,
    blogs: blogsSlice,
    user: userSlice,
  },
});
