import { createSlice } from "@reduxjs/toolkit";

const skinTypeSlice = createSlice({
    name: "skinType",
    initialState: {
        skinTypeList: [],
    },
    reducers: {
        setSkinType: (state, action) => {
            state.skinTypeList = action.payload;
        },
    },
});

export const { setSkinType } = skinTypeSlice.actions;

export default skinTypeSlice.reducer;