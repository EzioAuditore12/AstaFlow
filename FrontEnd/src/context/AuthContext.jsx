import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export function AuthProvider({ children }) {
    const [showRegister, setShowRegister] = useState(false);
    const [showSignIn, setShowSignIn] = useState(false);

    return (
        <AuthContext.Provider value={{ 
            showRegister, 
            setShowRegister,
            showSignIn,
            setShowSignIn 
        }}>
            {children}
        </AuthContext.Provider>
    );
}

export const useAuth = () => useContext(AuthContext);