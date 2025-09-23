// src/components/MainAppLayout.js
import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';

// Yeh component humara main layout hai: Sidebar + Content
function MainAppLayout({ onLogout }) {
  return (
    <div className="app-layout">
      <Sidebar onLogout={onLogout} />
      <main className="main-dashboard">
        {/* Outlet ek placeholder hai jahan aapke child routes (Dashboard, Products, etc.) render honge */}
        <Outlet />
      </main>
    </div>
  );
}

export default MainAppLayout;