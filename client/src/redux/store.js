import { configureStore } from "@reduxjs/toolkit";
import alertReducer from "./features/alertSlice"; // Importing the reducer directly
import userReducer from './features/userSlice';

export default configureStore({
  reducer: {
    alerts: alertReducer, // Using the reducer directly
    user: userReducer
  },
});
