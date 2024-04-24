import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './App.css'; // Import CSS file for styling

function App() {
  const [workerId, setWorkerId] = useState('');

  useEffect(() => {
    axios.get('http://localhost/worker')
      .then(response => {
        setWorkerId(response.data.worker_id);
      })
      .catch(error => {
        console.error('Error fetching worker ID:', error);
      });
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

