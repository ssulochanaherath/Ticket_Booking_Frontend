import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { CustomerModel } from "../models/CustomerModel.ts";
import axios from "axios";

const initialState: CustomerModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/",
});

//Fetch all customers
export const getCustomers = createAsyncThunk(
    "customer/getCustomers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/Customer/view");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to load customers");
        }
    }
);

//Add new customer and refresh list
export const saveCustomer = createAsyncThunk(
    "customer/saveCustomer",
    async (customer: CustomerModel, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.post("/Customer/add", customer);
            dispatch(getCustomers()); // Fetch updated customers list
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to save customer");
        }
    }
);

//Update customer and refresh list
export const updatedCustomer = createAsyncThunk(
    "customer/updateCustomer",
    async ({ email, customer }: { email: string; customer: CustomerModel }, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.put(`/Customer/update/${email}`, customer);
            dispatch(getCustomers()); // Fetch updated customers list
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update customer");
        }
    }
);

// ✅ Delete customer and refresh list
export const deletedCustomer = createAsyncThunk(
    "customer/deleteCustomer",
    async (email: string, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`/Customer/delete/${email}`);
            dispatch(getCustomers()); // Fetch updated customers list
            return email;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete customer");
        }
    }
);

const CustomerSlice = createSlice({
    name: "customer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            //Fetch customers
            .addCase(getCustomers.fulfilled, (_, action) => action.payload)
            .addCase(getCustomers.rejected, (state, action) => {
                console.error("Error fetching customers:", action.payload);
            })

            //Save customer
            .addCase(saveCustomer.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveCustomer.rejected, (state, action) => {
                console.error("Error saving customer:", action.payload);
            })

            //Update customer
            .addCase(updatedCustomer.fulfilled, (state, action) => {
                const index = state.findIndex((c) => c.email === action.payload.email);
                if (index >= 0) state[index] = action.payload;
            })
            .addCase(updatedCustomer.rejected, (state, action) => {
                console.error("Error updating customer:", action.payload);
            })

            //Delete customer
            .addCase(deletedCustomer.fulfilled, (state, action) => {
                return state.filter((customer) => customer.email !== action.payload);
            })
            .addCase(deletedCustomer.rejected, (state, action) => {
                console.error("Error deleting customer:", action.payload);
            });
    },
});

export default CustomerSlice.reducer;
