import React, { useState } from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import { ResponsiveProvider } from './context/index';
import { AuthProvider } from './context/AuthContext';
import Header from './components/0_Header/Header';
import MainBody from './pages/mainBody';
import Footer from './components/0_Footer/Footer';
import Register from './components/04_RegisterOrLogin/01_Register';
import SignIn from './components/04_RegisterOrLogin/02_SignIn';
import { useAuth } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import UserPage from './pages/05_UserPage';
import UploadPage from './pages/UploadPage';
import SearchResults from './pages/SearchResults';
import VideoPage from './pages/03_VideoPage';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated } = useAuth();
    return isAuthenticated ? children : <Navigate to="/signin" replace />;
};

function AppContent() {
    const { showRegister, setShowRegister, showSignIn, setShowSignIn } = useAuth();
    
    return (
        <div className="relative">
            <Header/>
            <MainBody/>
            <Footer/>
            <Register isOpen={showRegister} onClose={() => setShowRegister(false)} />
            <SignIn isOpen={showSignIn} onClose={() => setShowSignIn(false)} />
        </div>
    );
}

function App() {
    return (
        <BrowserRouter>
            <ResponsiveProvider>
                <AuthProvider>
                    <Toaster position="top-right" />
                    <Routes>
                        <Route path="/signin" element={<SignIn />} />
                        <Route path="/signup" element={<Register />} />
                        <Route path="/search" element={<SearchResults />} />
                        <Route 
                            path="/user" 
                            element={
                                <ProtectedRoute>
                                    <UserPage />
                                </ProtectedRoute>
                            } 
                        />
                        <Route 
                            path="/upload" 
                            element={
                                <ProtectedRoute>
                                    <UploadPage />
                                </ProtectedRoute>
                            } 
                        />
                        <Route path="/video/:videoId" element={<VideoPage />} />
                        <Route path="/*" element={<AppContent />} />
                    </Routes>
                </AuthProvider>
            </ResponsiveProvider>
        </BrowserRouter>
    );
}

export default App;
