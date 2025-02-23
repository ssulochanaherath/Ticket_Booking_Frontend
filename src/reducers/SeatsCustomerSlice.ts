import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { SeatsCustomerModel } from "../models/SeatsCustomerModel.ts";

// Initial state for the slice
const initialState: SeatsCustomerModel[] = [];

// API instance
const api = axios.create({
    baseURL: "http://localhost:3000/",
});

// Thunks to handle CRUD operations for SeatsCustomerModel

// Fetch all seats customers (available seats)
export const getSeatsCustomers = createAsyncThunk(
    "seatsCustomer/getSeatsCustomers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/CustomerSeats/view");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to load seats customers");
        }
    }
);

// Save new seat customer
export const saveSeatsCustomer = createAsyncThunk(
    "seatsCustomer/saveSeatsCustomer",
    async (seatsCustomer: SeatsCustomerModel, { rejectWithValue }) => {
        try {
            const response = await api.post("/CustomerSeats/add", seatsCustomer);
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to save seats customer");
        }
    }
);

export const resetSeatsCustomers = createAsyncThunk(
    "seatsCustomer/resetSeatsCustomers",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.delete("/CustomerSeats/reset");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to reset seats customers");
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
            // Fetch seats customers (available seats)
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

            // Reset seats customers
            .addCase(resetSeatsCustomers.fulfilled, () => [])
            .addCase(resetSeatsCustomers.rejected, (state, action) => {
                console.error("Error resetting seats customers:", action.payload);
            });
    },
});

export default seatsCustomerSlice.reducer;
