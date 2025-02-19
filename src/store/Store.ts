// src/store/store.ts
import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../reducers/CustomerSlice';

const store = configureStore({
    reducer: {
        customer: customerReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
