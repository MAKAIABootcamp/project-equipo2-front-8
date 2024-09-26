import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import  tipsReducer from "./tips/tipsSlice"

const store = configureStore({
    reducer: {
        auth: authReducer,
        tips: tipsReducer,
    }
})

export default store;