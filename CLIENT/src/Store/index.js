import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/product.js";
import userReducer from "./slices/user.js"

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
    },
});

export default store;