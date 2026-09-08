import { createSlice } from "@reduxjs/toolkit";

const ConnectionSlice = createSlice({
    name : "connections",
    initialState : [],
    reducers:{
        addconnections:(state,action)=>{
           return  action.payload;
        },
        removeconnections : (state , action)=>{
            return null;
        }
        
    }
});

export const {addconnections , removeconnections} = ConnectionSlice.actions;
export default ConnectionSlice.reducer