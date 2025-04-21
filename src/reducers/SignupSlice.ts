import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { SignupModel } from '../models/SignupModel';
import axios from 'axios';

const initialState = {
    email: '',
    password: '',
    role: '',
    error: '',
    loading: false,
    success: false,  // Add success field to the state
};

const api = axios.create({
    baseURL: 'http://localhost:3000',  // Ensure backend is running on this URL
});

//Async thunk for signup
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

export const fetchUserRoleByEmail = createAsyncThunk(
    'signup/fetchUserRoleByEmail',
    async (email: string, { rejectWithValue }) => {
        try {
            const response = await api.get(`User/role/${email}`); // Call the new API route
            return response.data.role; // Return the role
        } catch (error: any) {
            console.error('Error fetching role:', error);
            return rejectWithValue(error.response?.data || 'Failed to fetch role');
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
            //Signup fulfilled (success)
            .addCase(signupUser.fulfilled, (state, action) => {
                state.loading = false;
                state.error = '';
                state.success = true;  // Set success to true when signup is successful
                console.log('Signup successful:', action.payload);
            })
            //Signup rejected (failure)
            .addCase(signupUser.rejected, (state, action) => {
                state.loading = false;
                state.error = action.payload as string;
                state.success = false;  // Set success to false when signup fails
                console.error('Signup failed:', action.payload);
            })
            //Signup pending (loading)
            .addCase(signupUser.pending, (state) => {
                state.loading = true;
            })

            .addCase(fetchUserRoleByEmail.fulfilled, (state, action) => {
                state.role = action.payload;  // Ensure role is updated
                state.error = ''; // Clear previous errors
            })

            .addCase(fetchUserRoleByEmail.rejected, (state, action) => {
                state.error = action.payload as string;
            });

    },
});

export const { setEmail, setPassword, setRole, setError, clearError } = signupSlice.actions;

export default signupSlice.reducer;
