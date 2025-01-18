import React from 'react'
import { useForm } from 'react-hook-form'
import { IoClose } from "react-icons/io5"
import authService from '../../services/auth.service';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

function Register({ isOpen, onClose }) {
    const { setShowSignIn, login } = useAuth();
    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm()

    const onSubmit = async (data) => {
        try {
            const formData = new FormData();
            
            // Add all form fields
            formData.append('username', data.username);
            formData.append('email', data.email);
            formData.append('password', data.password);
            formData.append('fullName', data.fullName);

            // Add files
            if (data.avatar?.[0]) {
                formData.append('avatar', data.avatar[0]);
            }
            
            if (data.coverImage?.[0]) {
                formData.append('coverImage', data.coverImage[0]);
            }

            console.log("Form data being sent:", {
                username: data.username,
                email: data.email,
                fullName: data.fullName,
                hasAvatar: !!data.avatar?.[0],
                hasCoverImage: !!data.coverImage?.[0]
            });

            const response = await authService.register(formData);
            login(response.data);
            reset();
            onClose();
        } catch (error) {
            console.error('Registration failed:', error);
            toast.error(error.response?.data?.message || 'Registration failed');
        }
    };

    const switchToSignIn = () => {
        onClose();
        setShowSignIn(true);
    };

    if (!isOpen) return null

    return (
        <>
            {/* Overlay */}
            <div 
                className="fixed inset-0 bg-black bg-opacity-50 z-40"
                onClick={onClose}
            />
            
            {/* Modal */}
            <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white rounded-lg shadow-xl z-50 w-[90%] max-w-md p-6">
                <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-bold">Register</h2>
                    <IoClose 
                        className="w-6 h-6 cursor-pointer" 
                        onClick={onClose}
                    />
                </div>

                <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-1">Username</label>
                        <input
                            type="text"
                            {...register("username", { 
                                required: "Username is required",
                                minLength: {
                                    value: 3,
                                    message: "Username must be at least 3 characters"
                                }
                            })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.username && (
                            <p className="text-red-500 text-sm mt-1">{errors.username.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Full Name</label>
                        <input
                            type="text"
                            {...register("fullName", { required: "Full name is required" })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.fullName && (
                            <p className="text-red-500 text-sm mt-1">{errors.fullName.message}</p>
                        )}
                    </div>

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
                        />
                        {errors.password && (
                            <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Avatar</label>
                        <input
                            type="file"
                            {...register("avatar", { required: "Avatar is required" })}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                        {errors.avatar && (
                            <p className="text-red-500 text-sm mt-1">{errors.avatar.message}</p>
                        )}
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-1">Cover Image</label>
                        <input
                            type="file"
                            {...register("coverImage")}
                            className="w-full p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />
                    </div>

                    <button 
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded hover:bg-blue-600 transition-colors"
                    >
                        Register
                    </button>
                </form>

                <div className="mt-4 text-center text-sm text-gray-600">
                    Already have an account?{" "}
                    <button 
                        onClick={switchToSignIn}
                        className="text-blue-500 hover:text-blue-700 font-medium"
                    >
                        Sign In
                    </button>
                </div>
            </div>
        </>
    )
}

export default Register