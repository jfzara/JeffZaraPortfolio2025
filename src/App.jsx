 
import React from 'react';
import { createRoot } from 'react-dom/client';
import { ThemeProvider } from './theme/ThemeContext';
import Portfolio from './Portfolio';
import './index.css';  
 
const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <ThemeProvider>
      <Portfolio />
    </ThemeProvider>
  </React.StrictMode>
);