import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { MovieModel } from "../models/MovieModel";
import axios from "axios";

const initialState: MovieModel[] = [];

const api = axios.create({
    baseURL: "http://localhost:3000/",
});

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

export const updatedMovie = createAsyncThunk(
    "movie/updatedMovies",
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

export const deletedMovie = createAsyncThunk(
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

const MovieSlice = createSlice({
    name: "movie",
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder
        .addCase(getMovies.fulfilled, (_, action) => action.payload)
        .addCase(getMovies.rejected, (state, action) => {
            console.error("Error fetching movies:", action.payload);
        })
        .addCase(saveMovie.fulfilled, (state, action) => {
            state.push(action.payload);
        })
        .addCase(saveMovie.rejected, (state, action) => {
            console.error("Error saving movie:", action.payload);
        })


        .addCase(updatedMovie.fulfilled, (state, action) => {
            const index = state.findIndex((m) => m.id === action.payload.id);
            if (index >= 0) state[index] = action.payload;
        })
        .addCase(updatedMovie.rejected, (state, action) => {
            console.error("Error updating movie:", action.payload);
        })


        .addCase(deletedMovie.fulfilled, (state, action) => {
            return state.filter((movie) => movie.id !== action.payload);
        })
        .addCase(deletedMovie.rejected, (state, action) => {
            console.error("Error deleting movie:", action.payload);
        });
    },
})

export default MovieSlice.reducer;