import { createSlice } from "@reduxjs/toolkit";

const categorySlice = createSlice({
    name: "category",
    initialState: {
        categoryList: [],
        
    },
    reducers: {
        setCategories: (state, action) => {
            state.categoryList = action.payload;
        },

        addCategory: (state, action) => {
            state.categoryList = [...state.categoryList, action.payload];
        },

        updateCategory: (state, action) => {
            
            const { id, categoryRef, categoryLabel } = action.payload;

            for (let i = 0; i < state.categoryList.length; i++) {
                if (state.categoryList[i].id === id) {
                    state.categoryList[i].ref = categoryRef;
                    state.categoryList[i].label = categoryLabel;
                break; 
                }
            }
        },

        deleteCategory : (state, action) => {
            const idToDelete = action.payload;

            const updatedList = [];

            for (let i = 0; i < state.categoryList.length; i++) {
                if (state.categoryList[i].id !== idToDelete) {
                updatedList[updatedList.length] = state.categoryList[i];
                }
            }
            state.categoryList = updatedList;
        },
    },
});

export const { setCategories, addCategory, updateCategory, deleteCategory } = categorySlice.actions;

export default categorySlice.reducer;