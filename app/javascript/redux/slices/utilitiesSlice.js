import { createSlice } from "@reduxjs/toolkit";

export const utilitiesSlice = createSlice({
    name: 'utilitiesSlice',
    initialState: {value: {
        domain: 'http://localhost:3000',
    }},
    reducers: {
        updateDomain: (state) => {
            console.log(state.value.domain)
        }
    }
})

export const {updateDomain} = utilitiesSlice.actions
export default utilitiesSlice.reducer