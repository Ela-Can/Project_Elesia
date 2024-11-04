import { createSlice } from "@reduxjs/toolkit";

const skinConcernSlice = createSlice({
    name: "skinConcern",
    initialState: {
        skinConcernList: [],
    },
    reducers: {
        setSkinConcern: (state, action) => {
            state.skinConcernList = action.payload;
        },
    },
});

export const { setSkinConcern } = skinConcernSlice.actions;

export default skinConcernSlice.reducer;