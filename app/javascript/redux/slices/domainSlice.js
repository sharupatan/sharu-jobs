import { createSlice } from "@reduxjs/toolkit";

export const domainSlice = createSlice({
    name: 'domainSlice',
    initialState: {
        value: 'http://localhost:3000',
    },
})

export default domainSlice.reducer