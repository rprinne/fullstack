import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  message: null,
  type: null,
};

export const notificationSlice = createSlice({
  name: "notification",
  initialState,
  reducers: {
    setMessage: (state, action) => {
      state.message = action.payload;
    },
    setType: (state, action) => {
      state.type = action.payload;
    },
  },
});

export const { setMessage, setType } = notificationSlice.actions;

export const showNotification = (message, type) => {
  return async (dispatch) => {
    dispatch(setMessage(message));
    dispatch(setType(type));
    setTimeout(() => {
      dispatch(setMessage(null));
      dispatch(setType(null));
    }, 3000);
  };
};

export default notificationSlice.reducer;
