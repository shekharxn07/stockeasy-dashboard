// src/components/Settings.js

import React, { useContext } from 'react';
import { ThemeContext } from '../context/ThemeContext';
import { SettingsContext } from '../context/SettingsContext';

function Settings() {
  const { theme, toggleTheme } = useContext(ThemeContext);
  const { lowStockThreshold, setLowStockThreshold } = useContext(SettingsContext);

  const handleResetData = () => {
    if (window.confirm('Are you sure you want to reset all data? This action cannot be undone.')) {
      localStorage.clear();
      window.location.reload();
    }
  };

  return (
    <div className="dashboard-content settings-page">
      <h1>Settings</h1>
      
      {/* Card 1: Theme Settings */}
      <div className="setting-card">
        <div className="setting-info">
          <h3>Theme</h3>
          <p>Switch between light and dark mode for the application.</p>
        </div>
        <div className="setting-control">
          <button onClick={toggleTheme} className="btn btn-primary">
            Switch to {theme === 'light' ? 'Dark' : 'Light'} Mode
          </button>
        </div>
      </div>

      {/* Card 2: Inventory Settings */}
      <div className="setting-card">
        <div className="setting-info">
          <h3>Low Stock Threshold</h3>
          <p>Set the quantity that triggers a "Low Stock" warning.</p>
        </div>
        <div className="setting-control">
          <input 
            type="number" 
            value={lowStockThreshold}
            onChange={(e) => setLowStockThreshold(parseInt(e.target.value, 10) || 0)}
            className="setting-input"
          />
        </div>
      </div>

      {/* Card 3: Data Management */}
      <div className="setting-card">
        <div className="setting-info">
          <h3>Data Management</h3>
          <p>Reset all application data (products, etc.) to default.</p>
        </div>
        <div className="setting-control">
          <button onClick={handleResetData} className="btn btn-danger">
            Reset Application Data
          </button>
        </div>
      </div>
    </div>
  );
}

export default Settings;