import {createSlice, createAsyncThunk} from '@reduxjs/toolkit';
import type {GoalsState, Goal} from '../../types';
import api from '../../lib/axios';

const initialState: GoalsState = {
    goals: [],
    selectedGoal: null,
    progress: [],
    isLoading: false,
    error: null,
};

export const fetchGoals = createAsyncThunk('goals/fetchGoals', async () => {
    const response = await api.get('/goals');
    return response.data.data;
});

export const createGoal = createAsyncThunk(
    'goals/createGoal',
    async (goalData: Partial<Goal>) => {
        const response = await api.post('/goals', goalData);
        return response.data.data;
    }
);

export const updateGoal = createAsyncThunk(
    'goals/updateGoal',
    async ({id, data}: { id: number; data: Partial<Goal> }) => {
        const response = await api.patch(`/goals/${id}`, data);
        return response.data.data;
    }
);

export const deleteGoal = createAsyncThunk(
    'goals/deleteGoal',
    async (id: number) => {
        await api.delete(`/goals/${id}`);
        return id;
    }
);

export const fetchGoalProgress = createAsyncThunk(
    'goals/fetchProgress',
    async (goalId: number) => {
        const response = await api.get(`/goals/${goalId}/progress`);
        return response.data.data;
    }
);

export const logProgress = createAsyncThunk(
    'goals/logProgress',
    async ({
               goalId,
               data,
           }: {
        goalId: number;
        data: { notes: string; duration: number };
    }) => {
        const response = await api.post(`/goals/${goalId}/progress`, data);
        return response.data.data;
    }
);

const goalsSlice = createSlice({
    name: 'goals',
    initialState,
    reducers: {
        setSelectedGoal: (state, action) => {
            state.selectedGoal = action.payload;
        },
        clearError: (state) => {
            state.error = null;
        },
    },
    extraReducers: (builder) => {
        builder
            .addCase(fetchGoals.pending, (state) => {
                state.isLoading = true;
            })
            .addCase(fetchGoals.fulfilled, (state, action) => {
                state.isLoading = false;
                state.goals = action.payload;
            })
            .addCase(fetchGoals.rejected, (state, action) => {
                state.isLoading = false;
                state.error = action.error.message || 'Failed to fetch goals';
            })
            .addCase(createGoal.fulfilled, (state, action) => {
                state.goals.push(action.payload);
            })
            .addCase(updateGoal.fulfilled, (state, action) => {
                const index = state.goals.findIndex((g) => g.id === action.payload.id);
                if (index !== -1) {
                    state.goals[index] = action.payload;
                }
            })
            .addCase(deleteGoal.fulfilled, (state, action) => {
                state.goals = state.goals.filter((g) => g.id !== action.payload);
            })
            .addCase(fetchGoalProgress.fulfilled, (state, action) => {
                state.progress = action.payload;
            })
            .addCase(logProgress.fulfilled, (state, action) => {
                state.progress.push(action.payload);
            });
    },
});

export const {setSelectedGoal, clearError} = goalsSlice.actions;
export default goalsSlice.reducer;