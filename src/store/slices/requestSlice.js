import { createSlice } from "@reduxjs/toolkit";


const requestSlice = createSlice({
    name:"request",
    initialState:[],
    reducers:{
        addReqeust:(state,action)=>action.payload
    }
})

export const {addReqeust}=requestSlice.actions;
export default requestSlice.reducer
