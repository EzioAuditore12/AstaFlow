import React, { useState } from 'react';
import { FaUserCircle } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

function User() {
    const [showDropdown, setShowDropdown] = useState(false);
    const { setShowRegister, setShowSignIn } = useAuth();
    const navigate = useNavigate();

    return (
        <div className="relative">
            <div 
                onMouseEnter={() => setShowDropdown(true)}
                onMouseLeave={() => setShowDropdown(false)}
            >
                <FaUserCircle 
                    className='h-[30px] w-[30px] cursor-pointer'
                    onClick={() => navigate('/user')}
                />
                
                {showDropdown && (
                    <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
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
                    </div>
                )}
            </div>
        </div>
    );
}

export default User;
