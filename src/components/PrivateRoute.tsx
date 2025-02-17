import React, {useEffect} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppSelector, useAppDispatch} from '../store/hooks';
import {getCurrentUser} from '../store/slices/authSlice';
/**
 * @fileOverview A wrapper component that checks if the user is authenticated before rendering the children.
 * @param children - The children to render if the user is authenticated.
 * @returns The {@link JSX.Element} for the private route component.
 */
const PrivateRoute = ({children}: { children: React.ReactNode }) => {
    const dispatch = useAppDispatch();
    const {isAuthenticated, isLoading, user} = useAppSelector((state) => state.auth);

    useEffect(() => {
        if (!isAuthenticated && !user) {
            dispatch(getCurrentUser());
        }
    }, [dispatch, isAuthenticated, user]);

    if (isLoading) {
        return (
            <div className="min-h-screen flex items-center justify-center">
                <div className="h-8 w-8 animate-spin rounded-full border-4 border-blue-600 border-t-transparent"/>
            </div>
        );
    }

    if (!isAuthenticated) {
        return <Navigate to="/login" replace/>;
    }

    return <>{children}</>;
};

export default PrivateRoute;