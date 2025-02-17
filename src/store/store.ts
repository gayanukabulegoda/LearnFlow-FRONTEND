import {configureStore} from '@reduxjs/toolkit';
import authReducer from './slices/authSlice.ts';
import goalsReducer from './slices/goalsSlice.ts';
import resourcesReducer from './slices/resourcesSlice.ts';
/**
 * @fileoverview This file contains the store configuration for the application.
 * @reducers authReducer, goalsReducer, resourcesReducer
 * @exports RootState, AppDispatch, store
 */
export const store = configureStore({
    reducer: {
        auth: authReducer,
        goals: goalsReducer,
        resources: resourcesReducer,
    },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;