import {combineReducers, configureStore} from "@reduxjs/toolkit";
import CustomerSlice from "../reducers/CustomerSlice.ts";
import MovieSlice from "../reducers/MovieSlice.ts";
//import ItemSlice from "../reducers/ItemSlice.ts";

const rootReducer = combineReducers({
    customers: CustomerSlice,
    movies: MovieSlice,
    //items: ItemSlice,
})

export const store = configureStore({
    reducer: rootReducer
})

export type AppDispatch = typeof store.dispatch;