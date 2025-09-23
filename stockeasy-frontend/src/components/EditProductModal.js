import React, { useState, useEffect } from 'react';

function EditProductModal({ isOpen, onClose, product, onUpdateProduct }) {
  const [formData, setFormData] = useState({ name: '', sku: '', category: '', price: '', stock: '' });

  useEffect(() => {
    if (product) {
      setFormData({
        name: product.name,
        sku: product.sku,
        category: product.category,
        price: product.price.replace('₹ ', '').replace(',', ''),
        stock: product.stock
      });
    }
  }, [product]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateProduct(product.id, formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Product</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Product Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required /></div>
          <div className="form-group"><label>SKU</label><input type="text" name="sku" value={formData.sku} onChange={handleChange} required /></div>
          <div className="form-group"><label>Category</label><input type="text" name="category" value={formData.category} onChange={handleChange} required /></div>
          <div className="form-group"><label>Price</label><input type="number" name="price" value={formData.price} onChange={handleChange} required /></div>
          <div className="form-group"><label>Stock Quantity</label><input type="number" name="stock" value={formData.stock} onChange={handleChange} required /></div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Update Product</button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default EditProductModal;