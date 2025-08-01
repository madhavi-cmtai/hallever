// lib/redux/store.ts
import { configureStore } from "@reduxjs/toolkit";
import blogReducer from "./slice/blogSlice";
import careerReducer from "./slice/careerSlice";
import productReducer from "./slice/productSlice";
import serviceReducer from "./slice/serviceSlice";
import leadReducer from "./slice/leadSlice";    
import authReducer from "./slice/authSlice";
import countReducer from "./slice/countSlice";
import offerReducer from "./slice/offerSlice";
import jobApplicationReducer from './slice/jobApplicationsSlice';
      

export const store = configureStore({
    reducer: {
        auth: authReducer,
        count: countReducer,
        blogs: blogReducer,
        careers: careerReducer,
        products: productReducer,
        services: serviceReducer,
        leads: leadReducer,
        jobApplication: jobApplicationReducer,
        offer: offerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
