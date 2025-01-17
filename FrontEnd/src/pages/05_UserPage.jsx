import { Navigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { useState, useEffect } from 'react';
import { FaUser, FaCog, FaHistory } from 'react-icons/fa';
import userService from '../services/user.service';
import { toast } from 'react-hot-toast';

function UserPage() {
    const { isAuthenticated, user, logout } = useAuth();
    const [userDetails, setUserDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchUserDetails = async () => {
            try {
                const response = await userService.getUserProfile();
                setUserDetails(response);
                setError(null);
            } catch (err) {
                console.error('Profile fetch error:', err);
                setError(err.message || 'Failed to load profile');
                toast.error('Failed to load profile');
            } finally {
                setLoading(false);
            }
        };

        if (isAuthenticated) {
            fetchUserDetails();
        }
    }, [isAuthenticated]);

    if (!isAuthenticated || !user) {
        return <Navigate to="/signin" replace />;
    }

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

    const defaultAvatar = "https://via.placeholder.com/128x128.png?text=User";

    const handleLogout = async () => {
        try {
            await logout();
            toast.success('Logged out successfully');
        } catch (err) {
            toast.error('Logout failed');
        }
    };

    return (
        <div className="mt-[60px] min-h-screen bg-gray-50 p-4">
            <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md">
                <div className="relative p-6 flex flex-col md:flex-row items-center gap-6 border-b">
                    <div className="relative">
                        <img 
                            src={userDetails?.avatar || defaultAvatar} 
                            alt={userDetails?.name || "Profile"} 
                            className="w-32 h-32 rounded-full object-cover border-4 border-blue-500"
                            onError={(e) => {e.target.src = defaultAvatar}}
                        />
                    </div>
                    <div className="text-center md:text-left flex-grow">
                        <h1 className="text-2xl font-bold">{userDetails?.fullName}</h1>
                        <p className="text-gray-600">{userDetails?.email}</p>
                        <p className="text-sm text-gray-500">
                            Member since {new Date(userDetails?.createdAt).toLocaleDateString()}
                        </p>
                    </div>
                    <button 
                        onClick={handleLogout}
                        className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition-colors"
                    >
                        Logout
                    </button>
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

export default UserPage;