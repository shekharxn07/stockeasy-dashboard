import React from 'react';

function SaleDetailsModal({ isOpen, onClose, sale }) {
  if (!isOpen || !sale) return null;

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Sale Details (ID: S{String(sale.id).padStart(4, '0')})</h2>
        <div className="sale-details-summary">
          <p><strong>Customer:</strong> {sale.customer_name}</p>
          <p><strong>Date:</strong> {new Date(sale.sale_date).toLocaleDateString()}</p>
          <p><strong>Total Amount:</strong> {`₹ ${Number(sale.total_amount).toLocaleString('en-IN')}`}</p>
        </div>
        <h4>Items Sold</h4>
        <table className="products-table">
          <thead>
            <tr><th>SKU</th><th>Product Name</th><th>Quantity</th><th>Price/Unit</th></tr>
          </thead>
          <tbody>
            {sale.items && sale.items.map((item, index) => (
              <tr key={index}>
                <td>{item.sku}</td><td>{item.name}</td><td>{item.quantity}</td>
                <td>{`₹ ${Number(item.price_per_unit).toLocaleString('en-IN')}`}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="modal-actions">
          <button onClick={onClose} className="btn btn-secondary">Close</button>
        </div>
      </div>
    </div>
  );
}
export default SaleDetailsModal;