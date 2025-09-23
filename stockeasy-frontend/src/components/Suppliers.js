import React, { useState } from 'react';
import AddSupplierModal from './AddSupplierModal';
import EditSupplierModal from './EditSupplierModal';

function Suppliers({ suppliers, onAddSupplier, onUpdateSupplier, onDeleteSupplier }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingSupplier, setEditingSupplier] = useState(null);

  const handleDelete = (supplierId) => {
    if (window.confirm('Are you sure you want to delete this supplier?')) {
      onDeleteSupplier(supplierId);
    }
  };

  if (!suppliers) return <div className="dashboard-content"><h1>Loading...</h1></div>;

  return (
    <>
      <AddSupplierModal isOpen={isAddModalOpen} onClose={() => setIsAddModalOpen(false)} onAddSupplier={onAddSupplier} />
      <EditSupplierModal isOpen={editingSupplier !== null} onClose={() => setEditingSupplier(null)} supplier={editingSupplier} onUpdateSupplier={onUpdateSupplier} />

      <div className="dashboard-content">
        <div className="page-header">
          <h1>Manage Suppliers ({suppliers.length})</h1>
          <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">+ Add New Supplier</button>
        </div>
        <div className="content-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Supplier Name</th>
                <th>Contact Person</th>
                <th>Email</th>
                <th>Phone</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {suppliers.map((supplier) => (
                <tr key={supplier.id}>
                  <td>{supplier.name}</td>
                  <td>{supplier.contact_person}</td>
                  <td>{supplier.email}</td>
                  <td>{supplier.phone}</td>
                  <td>
                    <button onClick={() => setEditingSupplier(supplier)} className="action-btn">Edit</button>
                    <button onClick={() => handleDelete(supplier.id)} className="action-btn btn-danger">Delete</button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Suppliers;