import { configureStore } from "@reduxjs/toolkit";
import { baseApi } from "./api/Api";
import appReducer from "../redux/appSlice";
const store = configureStore({
    reducer:{
        [baseApi.reducerPath] : baseApi.reducer,
        modal : appReducer,
    },
    middleware : (getDefaultMiddleware) => getDefaultMiddleware().concat(baseApi.middleware),
})

export default store;
export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch