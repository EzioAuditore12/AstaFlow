import React, { useState, useEffect } from 'react';
import { FaUser, FaCog, FaHistory, FaUserCircle } from 'react-icons/fa';
import { useAuth } from '../../context/AuthContext';
import userService from '../../services/user.service';
import { toast } from 'react-hot-toast';

console.log('Default avatar path:', defaultAvatar);

function UserProfile() {
    const { user } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            if (!user?._id) {
                setLoading(false);
                return;
            }

            try {
                const response = await userService.getUserDetails(user._id);
                if (response?.data?.data) {
                    setUserDetails(response.data.data);
                } else {
                    throw new Error('Invalid response format');
                }
            } catch (err) {
                setError(err.message);
                toast.error('Failed to load profile');
                console.error('Error fetching user details:', err);
            } finally {
                setLoading(false);
            }
        };

        fetchUserDetails();
    }, [user?._id]);

    const renderAvatar = (avatarUrl) => {
        console.log('Rendering avatar with URL:', avatarUrl);
        if (avatarUrl) {
            return (
                <div className="relative w-32 h-32">
                    <img 
                        src={avatarUrl}
                        alt={userDetails?.fullName || "Profile"} 
                        className="w-full h-full rounded-full object-cover border-4 border-blue-500"
                        onError={(e) => {
                            console.log('Avatar load error, falling back to icon');
                            e.target.style.display = 'none';
                            e.target.nextSibling.style.display = 'block';
                        }}
                    />
                    <FaUserCircle 
                        className="absolute top-0 left-0 w-full h-full text-gray-400 hidden"
                        style={{ display: 'none' }}
                    />
                </div>
            );
        }
        return (
            <div className="w-32 h-32 rounded-full border-4 border-blue-500 flex items-center justify-center bg-gray-100">
                <FaUserCircle className="w-24 h-24 text-gray-400" />
            </div>
        );
    };

    if (loading) {
        return (
            <div className="mt-[60px] min-h-screen bg-gray-50 p-4">
                <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md animate-pulse">
                    <div className="p-6 flex items-center gap-6">
                        <div className="w-32 h-32 rounded-full bg-gray-200"/>
                        <div className="space-y-3">
                            <div className="h-6 w-48 bg-gray-200 rounded"/>
                            <div className="h-4 w-32 bg-gray-200 rounded"/>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="mt-[60px] min-h-screen bg-gray-50 p-4 flex items-center justify-center">
                <div className="text-red-500">Error: {error}</div>
            </div>
        );
    }

    return (
        <div className="mt-[60px] min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
                <div className="relative p-6 flex flex-col md:flex-row items-center gap-6 border-b">
                    <div className="relative">
                        {renderAvatar(userDetails?.avatar)}
                        <button className="absolute bottom-0 right-0 bg-blue-500 p-2 rounded-full text-white hover:bg-blue-600 transition-colors">
                            <FaCog className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="text-center md:text-left">
                        <h1 className="text-2xl font-bold">{userDetails?.fullName}</h1>
                        <p className="text-gray-600">{userDetails?.email}</p>
                        <p className="text-gray-600">@{userDetails?.username}</p>
                        <p className="text-sm text-gray-500">
                            Member since {new Date(userDetails?.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 p-6 border-b">
                    <div className="text-center">
                        <h3 className="text-lg font-semibold">{userDetails?.watchHistory?.length || 0}</h3>
                        <p className="text-gray-600">Watched</p>
                    </div>
                </div>

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