// src/context/SettingsContext.js

import React, { createContext, useState, useEffect } from 'react';

export const SettingsContext = createContext();

export const SettingsProvider = ({ children }) => {
  // 1. State banayein. Default value 10 rakhein ya localStorage se lein.
  const [lowStockThreshold, setLowStockThreshold] = useState(() => {
    const savedThreshold = localStorage.getItem('lowStockThreshold');
    return savedThreshold ? parseInt(savedThreshold, 10) : 10;
  });

  // 2. Jab bhi threshold badle, use localStorage mein save karein.
  useEffect(() => {
    localStorage.setItem('lowStockThreshold', lowStockThreshold);
  }, [lowStockThreshold]);

  return (
    <SettingsContext.Provider value={{ lowStockThreshold, setLowStockThreshold }}>
      {children}
    </SettingsContext.Provider>
  );
};