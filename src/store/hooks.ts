import {TypedUseSelectorHook, useDispatch, useSelector} from 'react-redux';
import type {RootState, AppDispatch} from './store.ts';
/**
 * @fileoverview This file contains custom hooks for the application.
 * @exports useAppDispatch - A custom hook to dispatch actions.
 * @exports useAppSelector - A custom hook to select state from the store.
 */
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;