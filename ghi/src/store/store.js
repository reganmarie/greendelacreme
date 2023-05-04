import { configureStore } from "@reduxjs/toolkit";
import { authApi } from "./authApi";
import { blogApi } from "./blogApi";
import { forumApi } from "./forumApi";
import { commentApi } from "./commentApi";
import { accountApi } from "./accountApi";
import { likeApi } from "./likeApi";
import { replyApi } from "./replyApi";
import { yelpApi } from "./yelpApi";
import { setupListeners } from "@reduxjs/toolkit/dist/query";


export const store = configureStore({
  reducer: {
    [authApi.reducerPath]: authApi.reducer,
    [forumApi.reducerPath]: forumApi.reducer,
    [accountApi.reducerPath]: forumApi.reducer,
    [blogApi.reducerPath]: blogApi.reducer,
    [commentApi.reducerPath]: commentApi.reducer,
    [likeApi.reducerPath]: likeApi.reducer,
    [replyApi.reducerPath]: replyApi.reducer,
    [yelpApi.reducerPath]: yelpApi.reducer,
  },
  middleware: getDefaultMiddleware =>
    getDefaultMiddleware()
      .concat(forumApi.middleware)
      .concat(accountApi.middleware)
      .concat(blogApi.middleware)
      .concat(authApi.middleware)
      .concat(commentApi.middleware)
      .concat(likeApi.middleware)
      .concat(replyApi.middleware)
      .concat(yelpApi.middleware),
});

setupListeners(store.dispatch);
