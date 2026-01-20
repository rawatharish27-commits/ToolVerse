import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { loadAnalytics } from './utils/analytics';

// Initialize Analytics Engine safely
try {
  loadAnalytics();
} catch (e) {
  console.warn("Analytics failed to load:", e);
}

const renderApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    console.error("Critical Error: Root element '#root' not found in document.");
    return;
  }
  
  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Ensure the DOM is fully loaded before mounting
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  renderApp();
}