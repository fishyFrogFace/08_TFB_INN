import React from 'react';
import './App.css';

const App: React.FC = () => {
  return (
    <div className='App'>
        <button className='Index-button' onClick={activateLasers}>
          Start
        </button>
    </div>
  );
}

export default App;
