// import { applyMiddleware, legacy_createStore } from "redux";
// import reducers from "./reducers";
// import {thunk} from "redux-thunk";

// export const store = legacy_createStore(reducers, {}, applyMiddleware(thunk));

import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./features/auth-slice";

const store = configureStore({
    reducer: {
        auth:authSlice.reducer
    }
});

export default store;