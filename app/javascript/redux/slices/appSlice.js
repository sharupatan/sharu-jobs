import {createSlice} from '@reduxjs/toolkit'

export const appSlice = createSlice({
    name: 'app',
    initialState: {
        value: false
    },
    reducers: {
        capitalize: (state) => {
            state.value = !state.value
        }
    }
})

export const {capitalize} = appSlice.actions
export default appSlice.reducer