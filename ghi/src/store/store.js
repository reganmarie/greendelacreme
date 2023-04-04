import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authapi";
import { blogApi } from "./blogapi";
import { forumApi } from "./forumapi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";


export const store = configureStore({
    reducer: {
        [forumApi.reducerPath]: forumApi.reducer,
        [blogApi.reducerPath]: blogApi.reducer,
        [authApi.reducerPath]: authApi.reducer,
    },
    middleware: getDefaultMiddleware =>
        getDefaultMiddleware()
            .concat(forumApi.middleware)
            .concat(blogApi.middleware)
            .concat(authApi.middleware),
});

setupListeners(store.dispatch);
