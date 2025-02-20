import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Customer } from '../models/CustomerModel';

interface CustomerState {
    customers: Customer[];
    counter: number;
}

const initialState: CustomerState = {
    customers: [],

    counter: 1,
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<Customer>) => {
            const newCustomer = { ...action.payload, id: `C${state.counter.toString().padStart(3, '0')}` };
            state.customers.push(newCustomer);
            state.counter += 1;
        },
        updateCustomer: (state, action: PayloadAction<Customer>) => {
            const { email, name, phone } = action.payload;
            const existingCustomer = state.customers.find(customer => customer.email === email);
            if (existingCustomer) {
                existingCustomer.name = name;
                existingCustomer.phone = phone;
            }
        },
        deleteCustomer: (state, action: PayloadAction<string>) => {
            state.customers = state.customers.filter(customer => customer.id !== action.payload);
        },
    },
});

export const { addCustomer, updateCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice.reducer;
