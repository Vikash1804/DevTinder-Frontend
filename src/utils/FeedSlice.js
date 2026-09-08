import { createSlice } from "@reduxjs/toolkit";

const FeedSlice = createSlice({
    name : 'feed',
    initialState : [],
    reducers :{
        adduserfeed: (state,action)=>{
            return action.payload
        },
        removefeed: (state ,action)=>{
            return null
        }
    }
})

export default FeedSlice.reducer
export const {adduserfeed , removefeed } = FeedSlice.actions;