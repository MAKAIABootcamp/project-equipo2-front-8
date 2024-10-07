import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import  tipsReducer from "./tips/tipsSlice"
import carruselReducer from "./Home/carruselSlice"
import beneficiosReducer from "./Home/beneficiosSlice"
import templatesReducer from "./templates/templatesSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        tips: tipsReducer,
        carrusel: carruselReducer,
        beneficios: beneficiosReducer,
        templates: templatesReducer,
    }
})

export default store;