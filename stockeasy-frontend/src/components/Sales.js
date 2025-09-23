import React, { useState } from 'react';
import CreateSaleModal from './CreateSaleModal';
import SaleDetailsModal from './SaleDetailsModal';

function Sales({ sales, products, onCreateSale }) {
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedSaleDetails, setSelectedSaleDetails] = useState(null);

  const handleViewDetails = async (saleId) => {
    try {
      const response = await fetch(`http://localhost:8000/api/sales/${saleId}`);
      if (!response.ok) throw new Error('Failed to fetch sale details');
      const data = await response.json();
      setSelectedSaleDetails(data);
    } catch (error) {
      console.error(error);
      alert('Could not fetch sale details.');
    }
  };

  if (!sales) return <div className="dashboard-content"><h1>Loading...</h1></div>;

  return (
    <>
      <CreateSaleModal isOpen={isCreateModalOpen} onClose={() => setIsCreateModalOpen(false)} products={products} onCreateSale={onCreateSale} />
      <SaleDetailsModal isOpen={selectedSaleDetails !== null} onClose={() => setSelectedSaleDetails(null)} sale={selectedSaleDetails} />

      <div className="dashboard-content">
        <div className="page-header">
          <h1>Sales Orders ({sales.length})</h1>
          <button onClick={() => setIsCreateModalOpen(true)} className="btn btn-primary">+ Create New Sale</button>
        </div>
        <div className="content-container">
          <table className="products-table">
            <thead>
              <tr><th>Order ID</th><th>Customer Name</th><th>Date</th><th>Total Amount</th></tr>
            </thead>
            <tbody>
              {sales.map((sale) => (
                <tr key={sale.id} onClick={() => handleViewDetails(sale.id)} className="clickable-row">
                  <td>{`S${String(sale.id).padStart(4, '0')}`}</td>
                  <td>{sale.customer_name}</td>
                  <td>{new Date(sale.sale_date).toLocaleDateString()}</td>
                  <td>{`₹ ${Number(sale.total_amount).toLocaleString('en-IN')}`}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
}
export default Sales;