// src/context/ThemeContext.js

import React, { createContext, useState, useEffect } from 'react';

// 1. Context create karein
export const ThemeContext = createContext();

// 2. Provider component banayein jo poore app ko wrap karega
export const ThemeProvider = ({ children }) => {
  const [theme, setTheme] = useState(() => localStorage.getItem('theme') || 'light');

  useEffect(() => {
    document.body.className = ''; // Pehle saari classes 
    document.body.classList.add(theme); // Nayi theme class add karein
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => (prevTheme === 'light' ? 'dark' : 'light'));
  };

  return (
    <ThemeContext.Provider value={{ theme, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};