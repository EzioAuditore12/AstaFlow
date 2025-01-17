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

    const login = (data) => {
        if (!data?.user) {
            toast.error('Invalid login response');
            return;
        }
        setUser(data.user);
        setIsAuthenticated(true);
        localStorage.setItem('user', JSON.stringify(data.user));
        localStorage.setItem('token', data.accessToken); // Add this line to store the token
        toast.success('Successfully logged in!');
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