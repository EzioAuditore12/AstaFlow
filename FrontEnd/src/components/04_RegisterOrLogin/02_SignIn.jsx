import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { IoClose } from "react-icons/io5";
import { useAuth } from '../../context/AuthContext';
import authService from '../../services/auth.service';
import { toast } from 'react-hot-toast';

function SignIn({ isOpen, onClose }) {
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    if (!isOpen) return null;

    const onSubmit = async (data) => {
        setIsLoading(true);
        try {
            const response = await authService.login(data);
            if (response.data) {
                login(response.data);
                reset();
                onClose();
            }
        } catch (error) {
            toast.error(error.message || 'Login failed');
            console.error('Login error:', error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <>
            <div className="fixed inset-0 bg-black bg-opacity-50 z-40" onClick={onClose} />
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-[90%] max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Sign In</h2>
                    <IoClose className="w-6 h-6 cursor-pointer" onClick={onClose} />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Email</label>
                        <input
                            type="email"
                            {...register("email", {
                                required: "Email is required",
                                pattern: {
                                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                                    message: "Invalid email address"
                                }
                            })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Password</label>
                        <input
                            type="password"
                            {...register("password", {
                                required: "Password is required",
                                minLength: {
                                    value: 6,
                                    message: "Password must be at least 6 characters"
                                }
                            })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                            disabled={isLoading}
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 rounded transition-colors ${
                            isLoading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-blue-600'
                        }`}
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing in...' : 'Sign In'}
                    </button>
                </form>
            </div>
        </>
    );
}

export default SignIn;