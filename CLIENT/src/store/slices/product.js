import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        productList: [],
    },
    reducers: {
        setProducts: (state, action) => {
            state.productList = action.payload;
        },
    },
});

export const { setProducts } = productSlice.actions;

export default productSlice.reducer;