import React from 'react';
import { FaUser, FaCog, FaHistory } from 'react-icons/fa';

function UserProfile() {
    const userInfo = {
        name: "John Doe",
        email: "john@example.com",
        joinDate: "January 2024",
        avatar: "https://via.placeholder.com/150",
        watchHistory: 42,
        favorites: 15
    };

    return (
        <div className="mt-[60px] min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
                {/* Profile Header */}
                <div className="relative p-6 flex flex-col md:flex-row items-center gap-6 border-b">
                    <div className="relative">
                        <img 
                            src={userInfo.avatar} 
                            alt="Profile" 
                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                        />
                        <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white">
                            <FaCog className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold">{userInfo.name}</h1>
                        <p className="text-gray-600">{userInfo.email}</p>
                        <p className="text-sm text-gray-500">Member since {userInfo.joinDate}</p>
                    </div>
                </div>

                {/* Stats Section */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold">{userInfo.watchHistory}</h3>
                        <p className="text-gray-600">Watched</p>
                    </div>
                    <div className="text-center">
                        <h3 className="text-lg font-semibold">{userInfo.favorites}</h3>
                        <p className="text-gray-600">Favorites</p>
                    </div>
                </div>

                {/* Quick Actions */}
                <div className="p-6">
                    <h2 className="text-lg font-semibold mb-4">Quick Actions</h2>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        <button className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50">
                            <FaHistory className="text-blue-500" />
                            <span>Watch History</span>
                        </button>
                        <button className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50">
                            <FaUser className="text-blue-500" />
                            <span>Edit Profile</span>
                        </button>
                        <button className="flex items-center gap-2 p-3 rounded-lg border hover:bg-gray-50">
                            <FaCog className="text-blue-500" />
                            <span>Settings</span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default UserProfile;