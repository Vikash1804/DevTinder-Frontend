import { createSlice } from "@reduxjs/toolkit";

const RequestsSlice = createSlice({
    name : "requests",
    initialState:null,
    reducers:{
        addRequests :(state,action)=> action.payload,
        removeRequest :(state,action)=>{
            const newArray = state.filter((req)=>req._id !== action.payload)
            return newArray;
        }
    }
});

export const {addRequests , removeRequest} = RequestsSlice.actions
export default RequestsSlice.reducer;