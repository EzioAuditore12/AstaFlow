import React, { useState, useRef } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { toast } from 'react-hot-toast';

function User() {
    const [showDropdown, setShowDropdown] = useState(false);
    const { user, isAuthenticated, setShowRegister, setShowSignIn, logout } = useAuth();
    const navigate = useNavigate();
    const dropdownRef = useRef(null);
    const timeoutRef = useRef(null);

    console.log('Auth State:', { isAuthenticated, user });

    const handleMouseEnter = () => {
        if (timeoutRef.current) {
            clearTimeout(timeoutRef.current);
        }
        setShowDropdown(true);
    };

    const handleMouseLeave = () => {
        timeoutRef.current = setTimeout(() => {
            setShowDropdown(false);
        }, 300);
    };

    const handleProfileClick = () => {
        navigate('/user');
        setShowDropdown(false);
    };

    const renderUserAvatar = () => {
        console.log('Rendering user avatar:', user?.avatar);
        if (isAuthenticated && user?.avatar) {
            return (
                <img
                    src={user.avatar}
                    alt={user?.fullName || "User"}
                    className="h-10 w-10 rounded-full cursor-pointer object-cover"
                    onError={(e) => {
                        console.log('Avatar load error, falling back to icon');
                        e.target.style.display = 'none';
                        e.target.nextSibling.style.display = 'block';
                    }}
                />
            );
        }
        return (
            <FaUserCircle
                className="h-[30px] w-[30px] cursor-pointer text-gray-600"
                onClick={() => setShowDropdown(!showDropdown)}
            />
        );
    };

    return (
        <div className="relative">
            <div 
                ref={dropdownRef}
                className="relative"
                onMouseEnter={handleMouseEnter}
                onMouseLeave={handleMouseLeave}
            >
                {renderUserAvatar()}
                
                {showDropdown && (
                    <div 
                        className="absolute right-0 mt-2 w-48 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 z-50"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={handleMouseLeave}
                    >
                        {isAuthenticated ? (
                            <>
                                <button
                                    onClick={() => {
                                        navigate('/user');
                                        setShowDropdown(false);
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    Profile
                                </button>
                                <button
                                    onClick={() => {
                                        logout();
                                        setShowDropdown(false);
                                        toast.success('Successfully logged out!');
                                    }}
                                    className="block px-4 py-2 text-sm text-red-600 hover:bg-gray-100 w-full text-left"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <button
                                    onClick={() => {
                                        setShowRegister(true);
                                        setShowDropdown(false);
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    Register
                                </button>
                                <button
                                    onClick={() => {
                                        setShowSignIn(true);
                                        setShowDropdown(false);
                                    }}
                                    className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                                >
                                    Sign In
                                </button>
                            </>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}

export default User;
