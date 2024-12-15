import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/product.js";
import userReducer from "./slices/user.js";
import diagnosticReducer from "./slices/diagnostic.js";
import menuReducer from "./slices/menu.js";

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        diagnostic: diagnosticReducer,
        menu: menuReducer,
    },
});

export default store;