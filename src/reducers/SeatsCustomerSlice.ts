import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {SeatsCustomerModel} from "../models/SeatsCustomerModel.ts";

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
    async (seatsCustomer: SeatsCustomerModel, {  }) => {
        try {
            const response = await api.post("/CustomerSeats/add", seatsCustomer);

            return response.data;
        } catch (error: any) {
            return (error.response?.data || "Failed to save seats customer");
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
    },
});

export default seatsCustomerSlice.reducer;
