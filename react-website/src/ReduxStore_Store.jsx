// ["ReduxStore", "Store"]    


import { configureStore } from "@reduxjs/toolkit";

// IMPORTANT: imports for all slices go here
import { authenticationReducer } from "./AuthenticationSlice_Store.jsx";
import { adminReducer } from "./AdminSlice_Store.jsx";

const store = configureStore({
  reducer: {
    // .. reducers go here
    authenticationState: authenticationReducer,
    adminState: adminReducer,
  },
});

export default store;