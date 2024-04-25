import React, { useState, useEffect } from 'react';
import './App.css'; // Import CSS file for styling

function App() {
  const [workerId, setWorkerId] = useState('');

  useEffect(() => {
    // Function to generate a random 6-character ID
    const generateWorkerId = () => {
      return Math.random().toString(36).substr(2, 6).toUpperCase();
    };

    // Generate and set the worker ID when the component mounts
    setWorkerId(generateWorkerId());
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <h1>Worker ID</h1>
        <p className="Worker-id">{workerId}</p>
      </header>
    </div>
  );
}

export default App;

