import {createSlice, PayloadAction} from "@reduxjs/toolkit";

interface Data {
    sidebarOpen: boolean,
    promoFilter: string
}

const initialState: Data = {
    sidebarOpen: true,
    promoFilter: ""
}

const dataGlobalReducer = createSlice({
    name: "dataGlobal",
    initialState,
    reducers: {
        toggleSidebar: (state, action: PayloadAction<boolean>) => {
            state.sidebarOpen = action.payload
        },
        filterPromoCodes: (state, action: PayloadAction<string>) => {
            state.promoFilter = action.payload
        }
    }
})
export const { toggleSidebar, filterPromoCodes } = dataGlobalReducer.actions;

export default dataGlobalReducer.reducer