import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {AuthState} from '../../types/types.ts';
import api from '../../lib/axios';
/**
 * @fileoverview This file contains the auth slice for the application.
 * @exports login, register, getCurrentUser, logout, clearError
 */
const initialState: AuthState = {
    user: null,
    isAuthenticated: false,
    isLoading: false,
    error: null,
};

export const login = createAsyncThunk(
    'auth/login',
    async (credentials: { email: string; password: string }, {rejectWithValue}) => {
        try {
            const response = await api.post('/auth/login', credentials);
            return response.data.data;
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue('Invalid email or password');
        }
    }
);

export const register = createAsyncThunk(
    'auth/register',
    async (userData: { email: string; password: string; name: string }, {rejectWithValue}) => {
        try {
            const response = await api.post('/auth/register', userData);
            return response.data.data;
        } catch (error: any) {
            if (error.response?.data?.message) {
                return rejectWithValue(error.response.data.message);
            }
            return rejectWithValue('Registration failed');
        }
    }
);

export const getCurrentUser = createAsyncThunk('auth/getCurrentUser', async () => {
    const response = await api.get('/auth/me');
    return response.data.data;
});

export const logout = createAsyncThunk('auth/logout', async () => {
    try {
        await api.post('/auth/logout');
    } finally {
        // Clear cookies even if the logout request fails
        document.cookie = 'accessToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        document.cookie = 'refreshToken=; path=/; expires=Thu, 01 Jan 1970 00:00:00 GMT';
        window.location.href = '/login';
    }
});

const authSlice = createSlice({
    name: 'auth',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(login.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(login.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(login.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Login failed';
            })
            .addCase(register.pending, (state) => {
                state.isLoading = true;
                state.error = null;
            })
            .addCase(register.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(register.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.payload as string || 'Registration failed';
            })
            .addCase(getCurrentUser.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(getCurrentUser.fulfilled, (state, action) => {
                state.isLoading = false;
                state.user = action.payload;
                state.isAuthenticated = true;
            })
            .addCase(getCurrentUser.rejected, (state) => {
                state.isLoading = false;
                state.user = null;
                state.isAuthenticated = false;
            })
            .addCase(logout.fulfilled, (state) => {
                state.user = null;
                state.isAuthenticated = false;
            });
    },
});

export const {clearError} = authSlice.actions;
export default authSlice.reducer;