import { configureStore } from "@reduxjs/toolkit";
import { artworksApi } from "./services/artworks";

const store = configureStore({
  reducer: {
    [artworksApi.reducerPath]: artworksApi.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({}).concat([artworksApi.middleware]),
});

export default store;

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;
