import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import Products from './components/Products';
import Sales from './components/Sales';
import Purchases from './components/Purchases';
import Suppliers from './components/Suppliers';
import Reports from './components/Reports';
import Settings from './components/Settings';
import SignIn from './components/SignIn';
import SignUp from './components/SignUp';
import './index.css';

// Yeh component humare main application ko protect karega
function ProtectedRoute({ isLoggedIn, children }) {
  if (!isLoggedIn) {
    return <Navigate to="/signin" replace />;
  }
  return children;
}

// Yeh humara main application layout hai
function MainAppLayout({ onLogout, appData }) {
  const { products, sales, purchases, suppliers, handlers } = appData;
  return (
    <div className="app-layout">
      <Sidebar onLogout={onLogout} />
      <main className="main-dashboard">
        <Routes>
          <Route path="/" element={<Dashboard products={products} sales={sales} />} />
          <Route path="/products" element={<Products products={products} onAddProduct={handlers.handleAddProduct} onUpdateProduct={handlers.handleUpdateProduct} onDeleteProduct={handlers.handleDeleteProduct} />} />
          <Route path="/sales" element={<Sales sales={sales} products={products} onCreateSale={handlers.handleCreateSale} />} />
          <Route path="/purchases" element={<Purchases purchases={purchases} products={products} onAddPurchase={handlers.handleAddPurchase} />} />
          <Route path="/suppliers" element={<Suppliers suppliers={suppliers} onAddSupplier={handlers.handleAddSupplier} onUpdateSupplier={handlers.handleUpdateSupplier} onDeleteSupplier={handlers.handleDeleteSupplier} />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="*" element={<Navigate to="/" />} />
        </Routes>
      </main>
    </div>
  );
}

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(!!localStorage.getItem('token'));

  const [products, setProducts] = useState([]);
  const [sales, setSales] = useState([]);
  const [purchases, setPurchases] = useState([]);
  const [suppliers, setSuppliers] = useState([]);

  const handleLogin = () => setIsLoggedIn(true);
  const handleLogout = () => setIsLoggedIn(false);

  // Data Fetching Logic
  const fetchData = async (endpoint, setter) => {
    try {
      const response = await fetch(`http://localhost:8000/api/${endpoint}`);
      if (!response.ok) throw new Error(`Failed to fetch ${endpoint}`);
      const data = await response.json();
      setter(data);
    } catch (error) { console.error(`Error fetching ${endpoint}:`, error); }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchData('products', setProducts);
      fetchData('sales', setSales);
      fetchData('purchases', setPurchases);
      fetchData('suppliers', setSuppliers);
    }
  }, [isLoggedIn]);

  // Handler Functions
  const handleAddProduct = async (data) => { await fetch('http://localhost:8000/api/products', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); fetchData('products', setProducts); };
  const handleUpdateProduct = async (id, data) => { await fetch(`http://localhost:8000/api/products/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); fetchData('products', setProducts); };
  const handleDeleteProduct = async (id) => { await fetch(`http://localhost:8000/api/products/${id}`, { method: 'DELETE' }); fetchData('products', setProducts); };
  const handleCreateSale = async (data) => { await fetch('http://localhost:8000/api/sales', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); fetchData('sales', setSales); fetchData('products', setProducts); };
  const handleAddPurchase = async (data) => { await fetch('http://localhost:8000/api/purchases', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); fetchData('purchases', setPurchases); fetchData('products', setProducts); };
  const handleAddSupplier = async (data) => { await fetch('http://localhost:8000/api/suppliers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); fetchData('suppliers', setSuppliers); };
  const handleUpdateSupplier = async (id, data) => { await fetch(`http://localhost:8000/api/suppliers/${id}`, { method: 'PUT', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); fetchData('suppliers', setSuppliers); };
  const handleDeleteSupplier = async (id) => { await fetch(`http://localhost:8000/api/suppliers/${id}`, { method: 'DELETE' }); fetchData('suppliers', setSuppliers); };

  const appData = {
    products, sales, purchases, suppliers,
    handlers: {
      handleAddProduct, handleUpdateProduct, handleDeleteProduct,
      handleCreateSale, handleAddPurchase,
      handleAddSupplier, handleUpdateSupplier, handleDeleteSupplier
    }
  };

  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/signin" element={<SignIn onLogin={handleLogin} />} />
        <Route path="/signup" element={<SignUp />} />

        {/* Protected Main App Route */}
        <Route 
          path="/*"
          element={
            <ProtectedRoute isLoggedIn={isLoggedIn}>
              <MainAppLayout onLogout={handleLogout} appData={appData} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </Router>
  );
}

export default App;