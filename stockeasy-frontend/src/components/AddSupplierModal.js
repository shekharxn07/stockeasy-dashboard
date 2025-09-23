import React, { useState } from 'react';

function AddSupplierModal({ isOpen, onClose, onAddSupplier }) {
  const [formData, setFormData] = useState({ name: '', contact_person: '', email: '', phone: '' });
  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onAddSupplier(formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Add New Supplier</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Supplier Name</label><input type="text" name="name" onChange={handleChange} required /></div>
          <div className="form-group"><label>Contact Person</label><input type="text" name="contact_person" onChange={handleChange} required /></div>
          <div className="form-group"><label>Email</label><input type="email" name="email" onChange={handleChange} required /></div>
          <div className="form-group"><label>Phone</label><input type="tel" name="phone" onChange={handleChange} required /></div>
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button>
            <button type="submit" className="btn btn-primary">Add Supplier</button>
          </div>
        </form>
      </div>
    </div>
  );
}
export default AddSupplierModal;