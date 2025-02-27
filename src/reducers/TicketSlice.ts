import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import axios from "axios";
import { TicketModel } from "../models/TicketModel.ts";

const initialState: TicketModel[] = [];  // Initial state is an empty array for tickets

const api = axios.create({
    baseURL: "http://localhost:3000/",
});

// Fetch tickets
export const getTickets = createAsyncThunk(
    "ticket/getTickets",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/Ticket/view");
            return response.data;  // Return ticket data from the API
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to load tickets");
        }
    }
);

// Save a new ticket
export const saveTickets = createAsyncThunk(
    'tickets/saveTickets',
    async (ticket: TicketModel, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.post("/Ticket/add", ticket);
            dispatch(getTickets()); // Fetch updated tickets list after saving
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to save ticket");
        }
    }
);

// Reset (delete) all tickets
export const resetTickets = createAsyncThunk(
    'tickets/resetTickets',
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.delete("/Ticket/reset"); // Ensure this matches the backend route
            return response.data; // Returning response data will help to clear tickets from the state
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to reset tickets");
        }
    }
);


const TicketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},  // No extra reducers are needed for this slice

    extraReducers: (builder) => {
        builder
            // Handle getTickets action
            .addCase(getTickets.fulfilled, (_, action: PayloadAction<TicketModel[]>) => action.payload)
            .addCase(getTickets.rejected, (state, action) => {
                console.error("Error fetching tickets:", action.payload);
            })

            // Handle saveTickets action
            .addCase(saveTickets.fulfilled, (state, action) => {
                state.push(action.payload);  // Add the new ticket to the state
            })
            .addCase(saveTickets.rejected, (state, action) => {
                console.error("Error saving ticket:", action.payload);
            })

            // Handle resetTickets action
            .addCase(resetTickets.fulfilled, () => {
                return [];  // Clear the tickets list when reset is successful
            })
            .addCase(resetTickets.rejected, (state, action) => {
                console.error("Error resetting tickets:", action.payload);
            });
    },
});

export default TicketSlice.reducer;
