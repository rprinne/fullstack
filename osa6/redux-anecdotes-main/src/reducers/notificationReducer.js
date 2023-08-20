import { createSlice } from '@reduxjs/toolkit'

const notificationSlice = createSlice({
  name: 'notification',
  initialState: {
    notification: null
  },
  reducers: {
    setNotification(state, action) {
      state.notification = action.payload
  }
  }
})

export const showNotification = (message, timeout) => {
  return dispatch => {
    dispatch(setNotification(message + "ida ida"))
    setTimeout(() => dispatch(setNotification(null)), timeout * 1000)
  }
}

export const { setNotification } = notificationSlice.actions
export default notificationSlice.reducer