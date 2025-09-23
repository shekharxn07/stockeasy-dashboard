import React from 'react';

function SalesTable() {
  const salesData = [
    { id: '#1254', customer: 'Rohan Kumar', amount: '₹ 2,500', status: 'Completed' },
    { id: '#1253', customer: 'Priya Sharma', amount: '₹ 1,200', status: 'Shipped' },
    { id: '#1252', customer: 'Amit Singh', amount: '₹ 850', status: 'Pending' },
  ];
  const getStatusClass = (status) => {
    if (status === 'Completed') return 'status-completed';
    if (status === 'Shipped') return 'status-shipped';
    if (status === 'Pending') return 'status-pending';
    return '';
  };
  return (
    <section className="table-container">
      <h3>Recent Sales</h3>
      <table>
        <thead>
          <tr><th>Order ID</th><th>Customer Name</th><th>Amount</th><th>Status</th></tr>
        </thead>
        <tbody>
          {salesData.map((sale) => (
            <tr key={sale.id}>
              <td>{sale.id}</td>
              <td>{sale.customer}</td>
              <td>{sale.amount}</td>
              <td><span className={`status ${getStatusClass(sale.status)}`}>{sale.status}</span></td>
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  );
}

export default SalesTable;