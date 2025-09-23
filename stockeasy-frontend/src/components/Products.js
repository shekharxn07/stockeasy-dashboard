import React, { useState } from 'react';
import AddProductModal from './AddProductModal';
import EditProductModal from './EditProductModal';
import { FaEdit, FaTrash } from 'react-icons/fa';

function Products({ products, onAddProduct, onUpdateProduct, onDeleteProduct }) {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [editingProduct, setEditingProduct] = useState(null);

  const handleDelete = (productId) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      onDeleteProduct(productId);
    }
  };

  if (!products) {
    return <div className="dashboard-content"><h1>Loading...</h1></div>;
  }

  return (
    <>
      <AddProductModal 
        isOpen={isAddModalOpen} 
        onClose={() => setIsAddModalOpen(false)} 
        onAddProduct={onAddProduct} 
      />
      <EditProductModal 
        isOpen={editingProduct !== null} 
        onClose={() => setEditingProduct(null)} 
        product={editingProduct} 
        onUpdateProduct={onUpdateProduct} 
      />
      
      <div className="dashboard-content">
        <div className="page-header">
          <h1>Manage Products ({products.length})</h1>
          <button onClick={() => setIsAddModalOpen(true)} className="btn btn-primary">+ Add New Product</button>
        </div>
        <div className="content-container">
          <table className="products-table">
            <thead>
              <tr>
                <th>SKU</th><th>Name</th><th>Category</th><th>Price</th><th>Stock</th><th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {products.map((product) => (
                <tr key={product.id}>
                  <td>{product.sku}</td>
                  <td>{product.name}</td>
                  <td>{product.category}</td>
                  <td>{`₹ ${Number(product.price).toLocaleString('en-IN')}`}</td>
                  <td>{product.stock}</td>
                  <td>
                    <button onClick={() => setEditingProduct(product)} className="action-btn"><FaEdit /></button>
                    <button onClick={() => handleDelete(product.id)} className="action-btn btn-danger"><FaTrash /></button>
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
export default Products;