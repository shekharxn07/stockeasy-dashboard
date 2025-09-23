import React, { useState } from 'react';

function AddProductModal({ isOpen, onClose, onAddProduct }) {
  const [formData, setFormData] = useState({ name: '', sku: '', category: '', price: '', stock: '' });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddProduct(formData);
    onClose();
  };
  
  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Product Name</label><input type="text" name="name" onChange={handleChange} required /></div>
          <div className="form-group"><label>SKU</label><input type="text" name="sku" onChange={handleChange} required /></div>
          <div className="form-group"><label>Category</label><input type="text" name="category" onChange={handleChange} required /></div>
          <div className="form-group"><label>Price</label><input type="number" name="price" onChange={handleChange} required /></div>
          <div className="form-group"><label>Stock Quantity</label><input type="number" name="stock" onChange={handleChange} required /></div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Add Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddProductModal;