import {combineReducers, configureStore} from "@reduxjs/toolkit";
import CustomerSlice from "../reducers/CustomerSlice.ts";
import MovieSlice from "../reducers/MovieSlice.ts";
import SeatsCustomerSlice from "../reducers/SeatsCustomerSlice.ts";
//import ItemSlice from "../reducers/ItemSlice.ts";

const rootReducer = combineReducers({
    customers: CustomerSlice,
    movies: MovieSlice,
    seatsCustomers: SeatsCustomerSlice,
    //items: ItemSlice,
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;