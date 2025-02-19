// src/reducers/CustomerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CustomerModel } from '../models/CustomerModel';

interface CustomerState {
    customers: CustomerModel[];
}

const initialState: CustomerState = {
    customers: [],
};

// Create a slice of the Redux store
const customerSlice = createSlice({
    name: 'customers',
    initialState,
    reducers: {
        getCustomers: (state) => {
            // You would likely fetch customers from an API here, but for now,
            // we will just set it to the initial state or any static data
            return state;
        },
        saveCustomer: (state, action: PayloadAction<CustomerModel>) => {
            state.customers.push(action.payload);
        },
        updateCustomer: (state, action: PayloadAction<{ email: string, updatedCustomer: CustomerModel }>) => {
            const { email, updatedCustomer } = action.payload;
            const customerIndex = state.customers.findIndex((cust) => cust.email === email);
            if (customerIndex !== -1) {
                state.customers[customerIndex] = updatedCustomer;
            }
        },
        deleteCustomer: (state, action: PayloadAction<string>) => {
            state.customers = state.customers.filter((cust) => cust.email !== action.payload);
        },
    },
});

export const { getCustomers, saveCustomer, updateCustomer, deleteCustomer } = customerSlice.actions;

export default customerSlice.reducer;
