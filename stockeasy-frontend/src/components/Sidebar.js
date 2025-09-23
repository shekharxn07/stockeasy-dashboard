// src/components/Sidebar.js

import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Sidebar({ onLogout }) {
  const location = useLocation();
  const currentPath = location.pathname;

  return (
    <aside className="sidebar">
      <div className="sidebar-brand">
        <h2>StockEasy</h2>
      </div>
      <nav className="sidebar-nav">
        <ul>
          <li className={currentPath === '/' ? 'active' : ''}><Link to="/">Dashboard</Link></li>
          <li className={currentPath === '/products' ? 'active' : ''}><Link to="/products">Products</Link></li>
          <li className={currentPath === '/sales' ? 'active' : ''}><Link to="/sales">Sales</Link></li>
          <li className={currentPath === '/purchases' ? 'active' : ''}><Link to="/purchases">Purchases</Link></li>
          <li className={currentPath === '/suppliers' ? 'active' : ''}><Link to="/suppliers">Suppliers</Link></li>
          <li className={currentPath === '/reports' ? 'active' : ''}><Link to="/reports">Reports</Link></li>
          <li className={currentPath === '/settings' ? 'active' : ''}><Link to="/settings">Settings</Link></li>
        </ul>
      </nav>
      
      <div className="sidebar-footer">
        <div onClick={onLogout} className="logout-link">Logout</div>
      </div>
    </aside>
  );
}

export default Sidebar;