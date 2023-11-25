import { configureStore } from "@reduxjs/toolkit";
import { cryptoapi } from "../services/cryptoAPI";
import { cryptonewsapi } from "../services/cryptoNewsApi";
export default configureStore({
    reducer:{
        [cryptoapi.reducerPath]:cryptoapi.reducer,
        [cryptonewsapi.reducerPath]:cryptonewsapi.reducer,
    },
    middleware:(getDefaultMiddleware)=>getDefaultMiddleware().concat([
        cryptoapi.middleware, 
        cryptonewsapi.middleware
      ])
    
})
