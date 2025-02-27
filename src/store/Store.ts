import {combineReducers, configureStore} from "@reduxjs/toolkit";
import CustomerSlice from "../reducers/CustomerSlice.ts";
import MovieSlice from "../reducers/MovieSlice.ts";
import SeatsCustomerSlice from "../reducers/SeatsCustomerSlice.ts";
import SignupSlice from "../reducers/SignupSlice.ts";
import ticketSlice from "../reducers/TicketSlice.ts";


const rootReducer = combineReducers({
    customers: CustomerSlice,
    movies: MovieSlice,
    seatsCustomers: SeatsCustomerSlice,
    signup: SignupSlice,
    ticket: ticketSlice

})

export const store = configureStore({
    reducer: rootReducer
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;