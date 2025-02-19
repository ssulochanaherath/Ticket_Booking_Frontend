// src/store/Store.ts
import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../reducers/CustomerSlice';

export const store = configureStore({
    reducer: {
        customers: customerReducer,  // Add the customer slice to the store
    },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
