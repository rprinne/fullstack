import { createSlice } from "@reduxjs/toolkit";
import blogService from "../services/blogs";
import loginService from "../services/login";
import { showNotification } from "./notificationSlice";

const initialState = {
  name: null,
  token: null,
  username: null,
};

export const notificationSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state, action) => {
      return action.payload;
    },
    setUserNull: () => {
      window.localStorage.clear();
      return initialState;
    },
  },
});

export const { setUser, setUserNull } = notificationSlice.actions;

export const loginUser = ({ username, password }) => {
  return async (dispatch) => {
    try {
      const user = await loginService.login({ username, password });
      blogService.setToken(user.token);
      window.localStorage.setItem("loggedBloglistUser", JSON.stringify(user));
      dispatch(setUser(user));
      dispatch(showNotification("login succesfull", "success"));
    } catch (exeption) {
      dispatch(showNotification("wrong credentials", "error"));
    }
  };
};

export default notificationSlice.reducer;
