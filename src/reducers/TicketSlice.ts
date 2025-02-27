import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';

import axios from "axios";
import { TicketModel } from "../models/TicketModel.ts";
const initialState: TicketModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/",
})

export const getTickets= createAsyncThunk (
    "ticket/getTickets",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/Ticket/view");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to load customers");
        }
    }
);

export const saveTickets = createAsyncThunk(
    'tickets/saveTickets',
    async (ticket: TicketModel, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.post("/Ticket/add", ticket);
            dispatch(getTickets()); // Fetch updated tickets list
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to load tickets");
        }
    }
);

const TicketSlice = createSlice({
    name: 'tickets',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            .addCase(getTickets.fulfilled, (_, action) => action.payload)
            .addCase(getTickets.rejected, (state, action) => {
                console.error("Error fetching customers:", action.payload);
            })

            .addCase(saveTickets.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveTickets.rejected, (state, action) => {
                console.error("Error saving customer:", action.payload);
            })
    },
})

export default TicketSlice.reducer


