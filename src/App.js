import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';
import './App.css';
import MobileScreen from './components/MobileScreen';

function App() {
  return (
    <Router>
      <div className="min-h-screen flex justify-center items-center bg-[#233142]">
        <MobileScreen />
      </div>
    </Router>
  );
}

export default App;