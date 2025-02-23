import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

// Define the SeatsCustomerModel
export class SeatsCustomerModel {
    name: string;

    constructor(name: string) {
        this.name = name;
    }
}

// Initial state for the slice
const initialState: SeatsCustomerModel[] = [];

// API instance
const api = axios.create({
    baseURL: "http://localhost:3000/",
});

// Thunks to handle CRUD operations for SeatsCustomerModel

// Fetch all seats customers
export const getSeatsCustomers = createAsyncThunk(
    "seatsCustomer/getSeatsCustomers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/SeatsCustomer/view");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to load seats customers");
        }
    }
);

// Save new seat customer
export const saveSeatsCustomer = createAsyncThunk(
    "seatsCustomer/saveSeatsCustomer",
    async (seatsCustomer: SeatsCustomerModel, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.post("/SeatsCustomer/add", seatsCustomer);
            dispatch(getSeatsCustomers()); // Fetch updated seats customers list
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to save seats customer");
        }
    }
);

// Update seat customer
export const updateSeatsCustomer = createAsyncThunk(
    "seatsCustomer/updateSeatsCustomer",
    async ({ name, seatsCustomer }: { name: string; seatsCustomer: SeatsCustomerModel }, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.put(`/SeatsCustomer/update/${name}`, seatsCustomer);
            dispatch(getSeatsCustomers()); // Fetch updated seats customers list
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update seats customer");
        }
    }
);

// Delete seat customer
export const deleteSeatsCustomer = createAsyncThunk(
    "seatsCustomer/deleteSeatsCustomer",
    async (name: string, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`/SeatsCustomer/delete/${name}`);
            dispatch(getSeatsCustomers()); // Fetch updated seats customers list
            return name;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete seats customer");
        }
    }
);

// Create slice for seats customer
const seatsCustomerSlice = createSlice({
    name: "seatsCustomer",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // Fetch seats customers
            .addCase(getSeatsCustomers.fulfilled, (_, action) => action.payload)
            .addCase(getSeatsCustomers.rejected, (state, action) => {
                console.error("Error fetching seats customers:", action.payload);
            })

            // Save seats customer
            .addCase(saveSeatsCustomer.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveSeatsCustomer.rejected, (state, action) => {
                console.error("Error saving seats customer:", action.payload);
            })

            // Update seats customer
            .addCase(updateSeatsCustomer.fulfilled, (state, action) => {
                const index = state.findIndex((c) => c.name === action.payload.name);
                if (index >= 0) state[index] = action.payload;
            })
            .addCase(updateSeatsCustomer.rejected, (state, action) => {
                console.error("Error updating seats customer:", action.payload);
            })

            // Delete seats customer
            .addCase(deleteSeatsCustomer.fulfilled, (state, action) => {
                return state.filter((customer) => customer.name !== action.payload);
            })
            .addCase(deleteSeatsCustomer.rejected, (state, action) => {
                console.error("Error deleting seats customer:", action.payload);
            });
    },
});

export default seatsCustomerSlice.reducer;
