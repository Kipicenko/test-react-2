import {configureStore} from "@reduxjs/toolkit";
import dataGlobalReducer from "./slices/dataGlobalSlice"

const store = configureStore({
    reducer: {
        dataGlobal: dataGlobalReducer
    }
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store