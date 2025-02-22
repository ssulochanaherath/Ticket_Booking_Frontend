// reducers/movieSlice.ts
import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieModel } from "../models/MovieModel";
import axios from "axios";

const initialState: MovieModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/",
});

// ✅ Fetch all movies
export const getMovies = createAsyncThunk(
    "movie/getMovies",
    async (_, { rejectWithValue }) => {
        try {
            const response = await api.get("/Movie/view");
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to load movies");
        }
    }
);

// ✅ Add new movie and refresh list
export const saveMovie = createAsyncThunk(
    "movie/saveMovie",
    async (movie: MovieModel, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.post("/Movie/add", movie);
            dispatch(getMovies()); // Fetch updated movies list
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to save movie");
        }
    }
);

// ✅ Update movie and refresh list
export const updateMovie = createAsyncThunk(
    "movie/updateMovie",
    async ({ id, movie }: { id: string; movie: MovieModel }, { dispatch, rejectWithValue }) => {
        try {
            const response = await api.put(`/Movie/update/${id}`, movie);
            dispatch(getMovies()); // Fetch updated movies list
            return response.data;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to update movie");
        }
    }
);

// ✅ Delete movie and refresh list
export const deleteMovie = createAsyncThunk(
    "movie/deleteMovie",
    async (id: string, { dispatch, rejectWithValue }) => {
        try {
            await api.delete(`/Movie/delete/${id}`);
            dispatch(getMovies()); // Fetch updated movies list
            return id;
        } catch (error: any) {
            return rejectWithValue(error.response?.data || "Failed to delete movie");
        }
    }
);

const movieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
            // ✅ Fetch movies
            .addCase(getMovies.fulfilled, (_, action) => action.payload)
            .addCase(getMovies.rejected, (state, action) => {
                console.error("Error fetching movies:", action.payload);
            })
            // ✅ Save movie
            .addCase(saveMovie.fulfilled, (state, action) => {
                state.push(action.payload);
            })
            .addCase(saveMovie.rejected, (state, action) => {
                console.error("Error saving movie:", action.payload);
            })
            // ✅ Update movie
            .addCase(updateMovie.fulfilled, (state, action) => {
                const index = state.findIndex((m) => m.id === action.payload.id);
                if (index >= 0) state[index] = action.payload;
            })
            .addCase(updateMovie.rejected, (state, action) => {
                console.error("Error updating movie:", action.payload);
            })
            // ✅ Delete movie
            .addCase(deleteMovie.fulfilled, (state, action) => {
                return state.filter((movie) => movie.id !== action.payload);
            })
            .addCase(deleteMovie.rejected, (state, action) => {
                console.error("Error deleting movie:", action.payload);
            });
    },
});

export default movieSlice.reducer;
