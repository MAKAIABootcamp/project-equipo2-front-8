import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./auth/authSlice";
import  tipsReducer from "./tips/tipsSlice"
import carruselReducer from "./Home/carruselSlice"
import beneficiosReducer from "./Home/beneficiosSlice"
import templatesReducer from "./templates/templatesSlice";
import interviewReducer from "./InterviewSimulator/InterviewSimulatorSlice";

const store = configureStore({
    reducer: {
        auth: authReducer,
        tips: tipsReducer,
        carrusel: carruselReducer,
        beneficios: beneficiosReducer,
        templates: templatesReducer,
        interview: interviewReducer,
    }
})

export default store;