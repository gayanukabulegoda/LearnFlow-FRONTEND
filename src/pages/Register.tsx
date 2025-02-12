import { useState } from 'react';
import { Link, Navigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../store/hooks';
import { register, clearError } from '../store/slices/authSlice';
import { Lightbulb } from 'lucide-react';
import Input from '../components/ui/Input';
import Button from '../components/ui/Button';

const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const dispatch = useAppDispatch();
    const { isAuthenticated, isLoading, error } = useAppSelector(
        (state) => state.auth
    );

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(clearError());
        await dispatch(register({ name, email, password }));
    };

    if (isAuthenticated) {
        return <Navigate to="/" replace />;
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 to-purple-50 py-12 px-4 sm:px-6 lg:px-8 animate-gradient-x">
            <div className="max-w-md w-full space-y-8 relative">
                {/* Decorative elements */}
                <div className="absolute -top-4 -left-4 w-24 h-24 bg-purple-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob"></div>
                <div className="absolute -top-4 -right-4 w-24 h-24 bg-blue-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-2000"></div>
                <div className="absolute -bottom-8 left-20 w-24 h-24 bg-indigo-100 rounded-full mix-blend-multiply filter blur-xl opacity-70 animate-blob animation-delay-4000"></div>

                {/* Content */}
                <div className="bg-white/80 backdrop-blur-lg rounded-2xl shadow-xl p-8 relative z-10 transform transition-all hover:scale-[1.01]">
                    <div className="text-center">
                        <div className="flex justify-center">
                            <div className="relative">
                                <div className="absolute inset-0 bg-purple-100 rounded-full blur-lg transform animate-pulse"></div>
                                <Lightbulb className="h-12 w-12 text-purple-600 relative" />
                            </div>
                        </div>
                        <h2 className="mt-6 text-3xl font-bold text-gray-900 tracking-tight">
                            Create your account
                        </h2>
                        <p className="mt-2 text-sm text-gray-600">
                            Already have an account?{' '}
                            <Link
                                to="/login"
                                className="font-medium text-purple-600 hover:text-purple-500 transition-colors"
                            >
                                Sign in
                            </Link>
                        </p>
                    </div>

                    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                        <div className="space-y-4">
                            <div className="transform transition-all duration-200 hover:translate-y-[-2px]">
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700">
                                    Full name
                                </label>
                                <Input
                                    id="name"
                                    type="text"
                                    value={name}
                                    onChange={(e) => setName(e.target.value)}
                                    required
                                    className="mt-1"
                                    placeholder="Enter your full name"
                                />
                            </div>

                            <div className="transform transition-all duration-200 hover:translate-y-[-2px]">
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700">
                                    Email address
                                </label>
                                <Input
                                    id="email"
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="mt-1"
                                    placeholder="Enter your email"
                                />
                            </div>

                            <div className="transform transition-all duration-200 hover:translate-y-[-2px]">
                                <label htmlFor="password" className="block text-sm font-medium text-gray-700">
                                    Password
                                </label>
                                <Input
                                    id="password"
                                    type="password"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                    required
                                    className="mt-1"
                                    placeholder="Create a password"
                                />
                            </div>
                        </div>

                        {error && (
                            <div className="text-sm text-red-600 text-center animate-shake">
                                {error}
                            </div>
                        )}

                        <Button
                            type="submit"
                            className="w-full transform transition-all duration-200 hover:translate-y-[-2px] hover:shadow-lg"
                            size="lg"
                            isLoading={isLoading}
                        >
                            Create account
                        </Button>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Register;