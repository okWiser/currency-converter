import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './index.css';

// Initialize Sentry in production
if (process.env.NODE_ENV === 'production') {
  // Sentry.init({
  //   dsn: process.env.VITE_SENTRY_DSN,
  //   environment: process.env.NODE_ENV,
  // });
}

const rootElement = document.getElementById('root');

if (!rootElement) {
  throw new Error('Root element not found. Make sure you have a div with id="root" in your HTML.');
}

const root = ReactDOM.createRoot(rootElement);

root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);