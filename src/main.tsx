import React from 'react';
import { createRoot } from 'react-dom/client';
import { AuthProvider } from './context/AuthContext';
import { Toaster } from 'react-hot-toast';
import App from './App';

const container = document.getElementById('root');
if (!container) throw new Error('Failed to find the root element');

const root = createRoot(container);

root.render(
  <React.StrictMode>
    <AuthProvider>
      <Toaster 
        position="top-right" 
        toastOptions={{
          duration: 4000,
          style: {
            background: '#55201a',
            color: '#fff',
            borderRadius: '1rem',
            padding: '1rem',
            fontWeight: '600',
            boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
          },
        }} 
      />
      <App />
    </AuthProvider>
  </React.StrictMode>
);
