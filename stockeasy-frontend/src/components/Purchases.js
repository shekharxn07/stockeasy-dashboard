// src/components/Purchases.js

import React, { useState } from 'react';
import CreatePurchaseModal from './CreatePurchaseModal';

function Purchases({ purchases, products, onAddPurchase }) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  if (!purchases) {
    return <div className="dashboard-content"><h1>Loading...</h1></div>;
  }

  return (
    <>
      <CreatePurchaseModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        products={products}
        onAddPurchase={onAddPurchase}
      />
      <div className="dashboard-content">
        <div className="page-header">
          <h1>Purchase Orders ({purchases.length})</h1>
          <button onClick={() => setIsModalOpen(true)} className="btn btn-primary">+ Add New Purchase</button>
        </div>
        <div className="content-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>Purchase ID</th>
                <th>Supplier</th>
                <th>Date</th>
                <th>Items</th>
                <th>Total Amount</th>
              </tr>
            </thead>
            <tbody>
              {purchases.map((purchase) => (
                <tr key={purchase.id}>
                  <td>{`P${String(purchase.id).padStart(4, '0')}`}</td>
                  <td>{purchase.supplier}</td>
                  {/* Sahi column name 'purchase_date' use karein */}
                  <td>{new Date(purchase.purchase_date).toLocaleDateString()}</td>
                  {/* Sahi column name 'items_count' use karein */}
                  <td>{purchase.items_count}</td>
                  {/* Sahi column name 'total_amount' use karein */}
                  <td>{`₹ ${Number(purchase.total_amount).toLocaleString('en-IN')}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}

export default Purchases;