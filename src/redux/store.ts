import { configureStore } from "@reduxjs/toolkit";
import categoryReducer from "./reducers/categoryReducer";

const store = configureStore({
  reducer: {
    category: categoryReducer, // 상태명 category, 변수명 categoryList
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
