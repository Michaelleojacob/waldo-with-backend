import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './app/app';
// import { initializeApp } from 'firebase/app';
// import { getFirebaseConfig } from './app/utils/firebase';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

// const firebaseAppConfig = getFirebaseConfig();
// initializeApp(firebaseAppConfig);
