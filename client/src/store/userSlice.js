import { createSlice } from "@reduxjs/toolkit"

const userSlice = createSlice({
    name: 'user',
    initialState: {
        userData: localStorage.getItem("userDetails") ? JSON.parse(localStorage.getItem("userDetails")) : null,
    },
    reducers: {
        setUserData: (state, action) => {
            state.userData = action.payload;
        },
    },
});

export const { setUserData } = userSlice.actions;
export default userSlice.reducer;
