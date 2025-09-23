import React, { useState, useEffect } from 'react';

function EditSupplierModal({ isOpen, onClose, supplier, onUpdateSupplier }) {
  const [formData, setFormData] = useState({ name: '', contactPerson: '', email: '', phone: '' });
  useEffect(() => { if (supplier) setFormData(supplier); }, [supplier]);
  if (!isOpen) return null;

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    onUpdateSupplier(supplier.id, formData);
    onClose();
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Edit Supplier</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group"><label>Supplier Name</label><input type="text" name="name" value={formData.name} onChange={handleChange} required /></div>
          <div className="form-group"><label>Contact Person</label><input type="text" name="contactPerson" value={formData.contactPerson} onChange={handleChange} required /></div>
          <div className="form-group"><label>Email</label><input type="email" name="email" value={formData.email} onChange={handleChange} required /></div>
          <div className="form-group"><label>Phone</label><input type="tel" name="phone" value={formData.phone} onChange={handleChange} required /></div>
          <div className="modal-actions"><button type="button" onClick={onClose} className="btn btn-secondary">Cancel</button><button type="submit" className="btn btn-primary">Update Supplier</button></div>
        </form>
      </div>
    </div>
  );
}
export default EditSupplierModal;