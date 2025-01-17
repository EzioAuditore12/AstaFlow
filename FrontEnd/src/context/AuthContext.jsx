import React, { createContext, useState, useContext } from 'react';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [user, setUser] = useState(() => {
        const savedUser = localStorage.getItem('user');
        return savedUser ? JSON.parse(savedUser) : null;
    });
    const [isAuthenticated, setIsAuthenticated] = useState(() => !!localStorage.getItem('token'));
    const [showRegister, setShowRegister] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);

    const login = (userData) => {
        console.log('Login data received:', userData);
        if (userData.accessToken) {
            localStorage.setItem('accessToken', userData.accessToken);
            // Store other necessary data
        }
        setUser(userData.user);
        setIsAuthenticated(true);
    };

    return (
        <AuthContext.Provider value={{
            user,
            isAuthenticated,
            login,
            logout: () => {
                setUser(null);
                setIsAuthenticated(false);
                localStorage.removeItem('user');
                localStorage.removeItem('token');
            },
            showRegister,
            setShowRegister,
            showSignIn, 
            setShowSignIn,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);