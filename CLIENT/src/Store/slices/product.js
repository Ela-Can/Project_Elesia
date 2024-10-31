import { createSlice } from "@reduxjs/toolkit";

const productSlice = createSlice({
    name: "product",
    initialState: {
        productList: [],
        productId: null,
    },
    reducers: {
        setProducts: (state, action) => {
            state.productList = action.payload;
        },
        setProductId: (state, action) => {
            state.productId = action.payload;
        },
    },
});

export const { setProducts, setProductId } = productSlice.actions;

export default productSlice.reducer;