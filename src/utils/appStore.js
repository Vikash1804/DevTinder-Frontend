import { configureStore } from "@reduxjs/toolkit";
import userReducer from "./userSlice";
import feedReducer from "./FeedSlice"
import connectionsReducer from "./ConnectionSlice"
import RequestsReducer from "./RequestsSlice"

const appstore = configureStore({
    reducer:{
        user: userReducer,
        feed: feedReducer,
        connections : connectionsReducer,
        requests : RequestsReducer,

    },
});

export default appstore;