// src/store/customerSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type Customer = {
    id: string;
    name: string;
    email: string;
    phone: string;
};

interface CustomerState {
    customers: Customer[];
    counter: number;
}

const initialState: CustomerState = {
    customers: [],
    counter: 1, // Initialize counter
};

const customerSlice = createSlice({
    name: 'customer',
    initialState,
    reducers: {
        addCustomer: (state, action: PayloadAction<Customer>) => {
            const newCustomer = { ...action.payload, id: `C${state.counter.toString().padStart(3, '0')}` };
            state.customers.push(newCustomer);
            state.counter += 1; // Increment counter for next ID
        },
        updateCustomer: (state, action: PayloadAction<Customer>) => {
            const { email, name, phone } = action.payload;
            const customerIndex = state.customers.findIndex(customer => customer.email === email);
            if (customerIndex >= 0) {
                state.customers[customerIndex] = { ...state.customers[customerIndex], name, phone };
            }
        },
        deleteCustomer: (state, action: PayloadAction<string>) => {
            state.customers = state.customers.filter(customer => customer.id !== action.payload);
        },
    },
});

export const { addCustomer, updateCustomer, deleteCustomer } = customerSlice.actions;
export default customerSlice.reducer;
