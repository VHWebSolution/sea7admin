import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Get the token from Local Storage, if it exists
const token = localStorage.getItem('token');

ReactDOM.createRoot(document.getElementById('root')).render(
  <App initialToken={token} />
);
