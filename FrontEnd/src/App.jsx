import React from 'react';
import MainBody from './pages/mainBody';
import { ResponsiveProvider } from './context/index';

function App() {
  return (
    <ResponsiveProvider>
      <MainBody/>
    </ResponsiveProvider>
  );
}

export default App;
