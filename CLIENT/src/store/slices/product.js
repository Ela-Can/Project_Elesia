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
        addProducts: (state, action) => {
            state.productList = [...state.productList, action.payload];
        },
        updateProducts: (state, action) => {
            const { id, updatedData } = action.payload;
            const updatedList = [...state.productList];
            for (let i = 0; i < updatedList.length; i++) {
                if (updatedList[i].id === id) {
                updatedList[i] = { ...updatedList[i], ...updatedData };
                break;
                }
            }
        state.productList = updatedList;
        },
    },
});

export const { setProducts, addProducts, updateProducts } = productSlice.actions;

export default productSlice.reducer;