import React from 'react';
import { ResponsiveProvider } from './context/index';
import { AuthProvider } from './context/AuthContext';
import Header from './components/0_Header/Header';
import MainBody from './pages/mainBody';
import Footer from './components/0_Footer/Footer';
import Register from './components/04_RegisterOrLogin/01_Register';
import SignIn from './components/04_RegisterOrLogin/02_SignIn';
import { useAuth } from './context/AuthContext';

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
        <ResponsiveProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </ResponsiveProvider>
    );
}

export default App;
