import {configureStore} from "@reduxjs/toolkit"
import {appReducer,utilitiesReducer,domainReducer} from "./slices/index" 

export const store = configureStore({
    reducer: {
        app: appReducer,
        domain: domainReducer,
        utilities: utilitiesReducer,
    },
})