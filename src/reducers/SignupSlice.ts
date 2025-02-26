import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SignupModel } from '../models/SignupModel';
import axios from 'axios';

// Initial state for the signup process
const initialState = {
    email: '',
    password: '',
    role: 'User',
    error: '',
    loading: false,
};

// Axios instance for API calls
const api = axios.create({
    baseURL: 'http://localhost:3000/', // Replace with your backend API URL
});

// ✅ Async thunk for signup
export const signupUser = createAsyncThunk(
    'signup/signupUser',
    async (user: SignupModel, { rejectWithValue }) => {
        try {
            const response = await api.post('/auth/signup', user); // Replace with your signup endpoint
            return response.data; // Assuming the backend returns the user or some success message
        } catch (error: any) {
            return rejectWithValue(error.response?.data || 'Failed to signup');
        }
    }
);

// Reducer slice for signup actions
const signupSlice = createSlice({
    name: 'signup',
    initialState,
    reducers: {
        setEmail: (state, action) => {
            state.email = action.payload;
        },
        setPassword: (state, action) => {
            state.password = action.payload;
        },
        setRole: (state, action) => {
            state.role = action.payload;
        },
        setError: (state, action) => {
            state.error = action.payload;
        },
        clearError: (state) => {
            state.error = '';
        },
    },
    extraReducers: (builder) => {
        builder
            // ✅ Signup fulfilled (success)
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                // You can add the logic to store the user's data after signup or navigate somewhere
                console.log('Signup successful:', action.payload);
            })
            // ✅ Signup rejected (failure)
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                console.error('Signup failed:', action.payload);
            })
            // ✅ Signup pending (loading)
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
            });
    },
});

export const { setEmail, setPassword, setRole, setError, clearError } = signupSlice.actions;

export default signupSlice.reducer;
