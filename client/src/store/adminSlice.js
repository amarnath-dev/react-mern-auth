import { createSlice } from "@reduxjs/toolkit";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        userDataAdmin: null,
    },
    reducers: {
        setUserDataAdmin: (state, action) => {
            state.userDataAdmin = action.payload
        }
    }
})

export const { setUserDataAdmin } = adminSlice.actions
export default adminSlice.reducer