/**
 * @fileoverview This file contains all the types used in the application.
 * @exports User, Goal, Progress, Resource, AuthState, GoalsState, ResourcesState
 */
export interface User {
    id: string;
    email: string;
    name: string;
}

export interface Goal {
    id: number;
    title: string;
    description: string;
    status: 'ACTIVE' | 'ARCHIVED' | 'COMPLETED';
    targetDate: string;
    progress?: number;
    createdAt: string;
    updatedAt: string;
}

export interface Progress {
    id: number;
    goalId: number;
    notes: string;
    duration: number;
    createdAt: string;
}

export interface Resource {
    id: number;
    title: string;
    reason: string;
    url: string;
    type: string;
    createdAt: string;
    tags: string;
}

export interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    error: string | null;
}

export interface GoalsState {
    goals: Goal[];
    selectedGoal: Goal | null;
    progress: Progress[];
    isLoading: boolean;
    error: string | null;
}

export interface ResourcesState {
    recommendations: Resource[];
    isLoading: boolean;
    error: string | null;
    reason: string | null;
    tags: string;
}