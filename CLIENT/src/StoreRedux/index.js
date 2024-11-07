import { configureStore } from "@reduxjs/toolkit";

import productReducer from "./slices/product.js";
import userReducer from "./slices/user.js";
import commentReducer from "./slices/comment.js";
import diagnosticReducer from "./slices/diagnostic.js";
import skinTypeReducer from "./slices/skinType.js";
import skinConcernReducer from "./slices/skinConcern.js";
import categoryReducer from "./slices/category.js";

const store = configureStore({
    reducer: {
        product: productReducer,
        user: userReducer,
        comment: commentReducer,
        diagnostic: diagnosticReducer,
        skinType: skinTypeReducer,
        skinConcern: skinConcernReducer,
        category : categoryReducer,
    },
});

export default store;