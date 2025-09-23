// src/components/CreateSaleModal.js

import React, { useState } from 'react';

function CreateSaleModal({ isOpen, onClose, products, onCreateSale }) {
  const [customerName, setCustomerName] = useState('');
  const [cartItems, setCartItems] = useState([]);

  if (!isOpen) return null;

  const handleAddProductToCart = (e) => {
    const productId = parseInt(e.target.value, 10);
    if (!productId || cartItems.find(item => item.id === productId)) return;

    const productToAdd = products.find(p => p.id === productId);
    setCartItems([...cartItems, { ...productToAdd, quantity: 1 }]);
  };

  const handleQuantityChange = (productId, quantity) => {
    const newQuantity = parseInt(quantity, 10) || 0;
    setCartItems(cartItems.map(item => 
      item.id === productId ? { ...item, quantity: newQuantity } : item
    ));
  };

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const price = parseFloat(item.price.replace('₹ ', '').replace(',', ''));
      return total + (price * item.quantity);
    }, 0).toFixed(2);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (cartItems.length === 0 || !customerName) {
      alert('Please add products and a customer name.');
      return;
    }
    onCreateSale({
      customer: customerName,
      items: cartItems,
      amount: `₹ ${calculateTotal()}`
    });
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Create New Sale</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Customer Name</label>
            <input type="text" value={customerName} onChange={(e) => setCustomerName(e.target.value)} required />
          </div>

          <div className="form-group">
            <label>Add Product</label>
            <select onChange={handleAddProductToCart} defaultValue="">
              <option value="" disabled>Select a product...</option>
              {products.filter(p => p.stock > 0).map(p => (
                <option key={p.id} value={p.id}>{p.name} (Stock: {p.stock})</option>
              ))}
            </select>
          </div>

          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.id} className="cart-item">
                <span>{item.name}</span>
                <input 
                  type="number" 
                  min="1" 
                  max={item.stock} 
                  value={item.quantity} 
                  onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                  className="quantity-input"
                />
              </div>
            ))}
          </div>

          <h3 className="sale-total">Total: ₹ {calculateTotal()}</h3>

          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Create Sale</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateSaleModal;