import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/app';
import app from './app/utils/firebase';

console.log(app);

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
