import {configureStore} from "@reduxjs/toolkit"
import {appReducer,domainReducer} from "./slices/index" 

export const store = configureStore({
    reducer: {
        app: appReducer,
    },
})