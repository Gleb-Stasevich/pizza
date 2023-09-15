import { configureStore } from "@reduxjs/toolkit";
import reducer from '../reducers/reducer';

const store = configureStore({
    reducer,
    devTools: process.env.NODE_ENV !== 'production',
    middleware: getDefaultMiddleware => getDefaultMiddleware()
})

export type RootState = ReturnType<typeof store.getState>;

export default store;