import React from 'react';
import MainBody from './pages/mainBody';
import { MobileProvider } from './context/MobileContext';

function App() {
  return (
    <MobileProvider>
      <>
        <MainBody/>
      </>
    </MobileProvider>
  );
}

export default App;
