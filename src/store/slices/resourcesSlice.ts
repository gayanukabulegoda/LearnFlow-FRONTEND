import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {ResourcesState} from '../../types/types.ts';
import api from '../../lib/axios';
/**
 * @fileoverview This file contains the resources slice for the application.
 * @exports fetchRecommendations, trackInteraction
 */
const initialState: ResourcesState = {
    recommendations: [],
    isLoading: false,
    error: null,
    reason: null,
    tags: '',
};

export const fetchRecommendations = createAsyncThunk(
    'resources/fetchRecommendations',
    async () => {
        const response = await api.get('/resources/recommendations');
        return response.data.data;
    }
);

export const trackInteraction = createAsyncThunk(
    'resources/trackInteraction',
    async ({
               recommendationId,
               type,
           }: {
        recommendationId: number;
        type: string;
    }) => {
        const response = await api.post('/resources/interact', {
            recommendationId,
            type,
        });
        return response.data.data;
    }
);

const resourcesSlice = createSlice({
    name: 'resources',
    initialState,
    reducers: {
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchRecommendations.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchRecommendations.fulfilled, (state, action) => {
                state.isLoading = false;
                state.recommendations = action.payload;
            })
            .addCase(fetchRecommendations.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch recommendations';
            });
    },
});

export default resourcesSlice.reducer;