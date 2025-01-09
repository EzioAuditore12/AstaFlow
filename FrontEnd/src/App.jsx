import React from 'react';
import { ResponsiveProvider } from './context/index';
import Header from './components/0_Header/Header';
import MainBody from './pages/mainBody'

function App() {
  return (
    <ResponsiveProvider>
      <Header/>
      <MainBody/>
    </ResponsiveProvider>
  );
}

export default App;
