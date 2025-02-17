import React, {useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {login, clearError} from '../store/slices/authSlice';
import {Mail, Lock} from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import AuthHeader from '../components/auth/AuthHeader';
import FormField from '../components/auth/FormField';
import AuthButton from '../components/auth/AuthButton';
import ErrorMessage from '../components/auth/ErrorMessage';
/**
 * @fileOverview The Login component: used for user login.
 * @exports Login - The Login component.
 */
const Login = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const {isAuthenticated, isLoading, error} = useAppSelector((state) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());
        await dispatch(login({email, password}));
    };

    if (isAuthenticated) return <Navigate to="/" replace/>;

    return (
        <AuthLayout blobColors={['bg-blue-200', 'bg-purple-200', 'bg-pink-200', 'bg-yellow-200']}>
            <AuthCard hoverColor="blue">
                <AuthHeader
                    title="Welcome back"
                    linkText="Don't have an account?"
                    linkPath="/register"
                    linkPathText="Sign up"
                    themeColor="blue"
                />

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <FormField
                            id="email"
                            label="Email address"
                            type="email"
                            value={email}
                            onChange={setEmail}
                            icon={Mail}
                            placeholder="Enter your email"
                            themeColor="blue"
                        />

                        <FormField
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={setPassword}
                            icon={Lock}
                            placeholder="Enter your password"
                            themeColor="blue"
                        />
                    </div>

                    <ErrorMessage message={error || undefined}/>

                    <AuthButton
                        type="submit"
                        themeColor="blue"
                        isLoading={isLoading}
                    >
                        Sign in
                    </AuthButton>
                </form>
            </AuthCard>
        </AuthLayout>
    );
};

export default Login;