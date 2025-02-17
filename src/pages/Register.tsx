import React, {useEffect, useState} from 'react';
import {Navigate} from 'react-router-dom';
import {useAppDispatch, useAppSelector} from '../store/hooks';
import {register, clearError} from '../store/slices/authSlice';
import {Mail, Lock, User} from 'lucide-react';
import AuthLayout from '../components/auth/AuthLayout';
import AuthCard from '../components/auth/AuthCard';
import AuthHeader from '../components/auth/AuthHeader';
import FormField from '../components/auth/FormField';
import AuthButton from '../components/auth/AuthButton';
import ErrorMessage from '../components/auth/ErrorMessage';
/**
 * @fileOverview The Register component: used to register a new user.
 * @exports Register - The Register component.
 */
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const {isAuthenticated, isLoading, error} = useAppSelector((state) => state.auth);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());
        await dispatch(register({name, email, password}));
    };

    useEffect(() => {
        return () => {
            dispatch(clearError());
        };
    }, []);

    if (isAuthenticated) return <Navigate to="/" replace/>;

    return (
        <AuthLayout blobColors={['bg-purple-200', 'bg-pink-200', 'bg-red-200', 'bg-orange-200']}>
            <AuthCard hoverColor="purple">
                <AuthHeader
                    title="Create your account"
                    linkText="Already have an account?"
                    linkPath="/login"
                    linkPathText="Sign in"
                    themeColor="purple"
                />

                <form onSubmit={handleSubmit} className="mt-8 space-y-6">
                    <div className="space-y-4">
                        <FormField
                            id="name"
                            label="Full name"
                            type="text"
                            value={name}
                            onChange={setName}
                            icon={User}
                            placeholder="Enter your full name"
                            themeColor="purple"
                        />

                        <FormField
                            id="email"
                            label="Email address"
                            type="email"
                            value={email}
                            onChange={setEmail}
                            icon={Mail}
                            placeholder="Enter your email"
                            themeColor="purple"
                        />

                        <FormField
                            id="password"
                            label="Password"
                            type="password"
                            value={password}
                            onChange={setPassword}
                            icon={Lock}
                            placeholder="Create a password"
                            themeColor="purple"
                        />
                    </div>

                    <ErrorMessage message={error || undefined}/>

                    <AuthButton
                        type="submit"
                        themeColor="purple"
                        isLoading={isLoading}
                    >
                        Create account
                    </AuthButton>
                </form>
            </AuthCard>
        </AuthLayout>
    );
};

export default Register;