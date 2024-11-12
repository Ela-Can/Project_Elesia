import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/product.js";
import userReducer from "./slices/user.js";
import diagnosticReducer from "./slices/diagnostic.js";



const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        diagnostic: diagnosticReducer,
    },
});

export default store;