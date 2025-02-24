import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { ScheduleModel } from "../models/ScheduleModel.ts";
import axios from "axios";

const initialState: ScheduleModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/",
});

// ✅ Fetch all schedules
export const getSchedules = createAsyncThunk(
    "schedule/getSchedules",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/Schedule/view");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to load schedules");
        }
    }
);

// ✅ Add new schedule and refresh list
export const saveSchedule = createAsyncThunk(
    "schedule/saveSchedule",
    async (schedule: ScheduleModel, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.post("/Schedule/add", schedule);
            dispatch(getSchedules()); // Fetch updated schedules list
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to save schedule");
        }
    }
);

// ✅ Update schedule and refresh list
export const updatedSchedule = createAsyncThunk(
    "schedule/updateSchedule",
    async ({ name, schedule }: { name: string; schedule: ScheduleModel }, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.put(`/Schedule/update/${name}`, schedule);
            dispatch(getSchedules()); // Fetch updated schedules list
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update schedule");
        }
    }
);

// ✅ Delete schedule and refresh list
export const deletedSchedule = createAsyncThunk(
    "schedule/deleteSchedule",
    async (name: string, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`/Schedule/delete/${name}`);
            dispatch(getSchedules()); // Fetch updated schedules list
            return name;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete schedule");
        }
    }
);

const ScheduleSlice = createSlice({
    name: "schedule",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Fetch schedules
            .addCase(getSchedules.fulfilled, (_, action) => action.payload)
            .addCase(getSchedules.rejected, (state, action) => {
                console.error("Error fetching schedules:", action.payload);
            })

            // ✅ Save schedule
            .addCase(saveSchedule.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveSchedule.rejected, (state, action) => {
                console.error("Error saving schedule:", action.payload);
            })

            // ✅ Update schedule
            .addCase(updatedSchedule.fulfilled, (state, action) => {
                const index = state.findIndex((s) => s.name === action.payload.name);
                if (index >= 0) state[index] = action.payload;
            })
            .addCase(updatedSchedule.rejected, (state, action) => {
                console.error("Error updating schedule:", action.payload);
            })

            // ✅ Delete schedule
            .addCase(deletedSchedule.fulfilled, (state, action) => {
                return state.filter((schedule) => schedule.name !== action.payload);
            })
            .addCase(deletedSchedule.rejected, (state, action) => {
                console.error("Error deleting schedule:", action.payload);
            });
    },
});

export default ScheduleSlice.reducer;
