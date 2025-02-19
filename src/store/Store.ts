import { configureStore } from '@reduxjs/toolkit';
import customerReducer from '../reducers/CustomerSlice';

const store = configureStore({
    reducer: {
        customer: customerReducer,
    },
});

export default store;
