import React from 'react';
import { ResponsiveProvider } from './context/index';
import Header from './components/0_Header/Header';
import MainBody from './pages/mainBody'
import Footer from './components/0_Footer/Footer';

function App() {
  return (
    <ResponsiveProvider>
      <Header/>
      <MainBody/>
      <Footer/>
    </ResponsiveProvider>
  );
}

export default App;
