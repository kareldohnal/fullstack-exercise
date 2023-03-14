import { Action, ThunkAction, configureStore } from '@reduxjs/toolkit';
import user from "../features/login/userSlice";
import articles from "../features/articles/articlesSlice";

export const store = configureStore({
  reducer: {
    user,
    articles,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
