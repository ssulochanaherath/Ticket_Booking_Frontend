import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SignupModel } from '../models/SignupModel';
import axios from 'axios';

const initialState = {
    email: '',
    password: '',
    role: 'User',
    error: '',
    loading: false,
};

const api = axios.create({
    baseURL: 'http://localhost:3000',  // Ensure backend is running on this URL
});

// ✅ Async thunk for signup
export const signupUser = createAsyncThunk(
    'signup/signupUser',
    async (user: SignupModel, { rejectWithValue }) => {
        try {
            console.log('Sending user data:', user);  // Log to see the data
            const response = await api.post('/User/add', user); // Ensure correct endpoint and format
            return response.data;
        } catch (error: any) {
            console.error('Error signing up:', error);  // Log error details
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
