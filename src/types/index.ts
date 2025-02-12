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
    description: string;
    url: string;
    type: string;
    createdAt: string;
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
}