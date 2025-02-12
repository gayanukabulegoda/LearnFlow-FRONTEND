import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import type { ResourcesState } from '../../types';
import api from '../../lib/axios';

const initialState: ResourcesState = {
    recommendations: [],
    isLoading: false,
    error: null,
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
        const response = await api.post('/resources/interactions', {
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

export const { clearError } = resourcesSlice.actions;
export default resourcesSlice.reducer;