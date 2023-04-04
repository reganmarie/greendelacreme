import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { blogApi } from "./blogApi";
import { forumApi } from "./forumApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";
import { userSlice } from "./user";


export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [forumApi.reducerPath]: forumApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        auth: userSlice.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(forumApi.middleware)
            .concat(blogApi.middleware)
            .concat(authApi.middleware),
});

setupListeners(store.dispatch);
