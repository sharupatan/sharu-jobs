import { createSlice } from "@reduxjs/toolkit";

export const utilitiesSlice = createSlice({
    name: 'utilitiesSlice',
    initialState: {
        value: {
            homePath: '/',
            loginPath: '/login',
            signupPath: '/register',
        }
    },
    reducers: {
        redirectToHome: (state) => {
            window.location.replace(state.homePath)
        },
        redirectTologin: (state) => {
            window.location.replace(state.loginPath)
        },
        redirectToSignup: (state) => {
            window.location.replace(state.signupPath)
        },
        redirectTo: (state,action) => {
            window.location.replace(action.payload)
        },
    }
})

export const {redirectToHome,redirectTologin,redirectToSignup,redirectTo} = utilitiesSlice.actions
export default utilitiesSlice.reducer