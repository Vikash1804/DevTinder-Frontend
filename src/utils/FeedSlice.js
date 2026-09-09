import { createSlice } from "@reduxjs/toolkit";

const FeedSlice = createSlice({
    name : 'feed',
    initialState : [],
    reducers :{
        adduserfeed: (state,action)=>{
            return action.payload
        },
        removeUserFromfeed: (state ,action)=>{
           const NewFeed = state.filter((user)=> user._id !== action.payload)
           return NewFeed;
        }
    }
})

export default FeedSlice.reducer
export const {adduserfeed , removeUserFromfeed } = FeedSlice.actions;