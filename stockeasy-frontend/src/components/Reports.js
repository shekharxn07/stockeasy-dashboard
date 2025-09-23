// src/components/Reports.js

import React, { useState, useEffect } from 'react';

function Reports() {
  const [summary, setSummary] = useState(null);

  useEffect(() => {
    const fetchSummary = async () => {
      try {
        const response = await fetch('http://localhost:8000/api/reports/summary');
        const data = await response.json();
        setSummary(data);
      } catch (error) {
        console.error("Failed to fetch report summary:", error);
      }
    };
    fetchSummary();
  }, []);

  if (!summary) {
    return <div className="dashboard-content"><h1>Loading Reports...</h1></div>;
  }

  return (
    <div className="dashboard-content">
      <div className="page-header">
        <h1>Business Reports</h1>
      </div>

      <section className="kpi-section">
        <div className="kpi-card">
          <h4>Total Revenue 📈</h4>
          <h2>₹ {summary.totalRevenue.toLocaleString('en-IN')}</h2>
        </div>
        <div className="kpi-card">
          <h4>Total Cost 📉</h4>
          <h2>₹ {summary.totalCost.toLocaleString('en-IN')}</h2>
        </div>
        <div className="kpi-card">
          <h4>Gross Profit 💰</h4>
          <h2 className={summary.grossProfit >= 0 ? 'success-text' : 'danger-text'}>
            ₹ {summary.grossProfit.toLocaleString('en-IN')}
          </h2>
        </div>
        <div className="kpi-card">
          <h4>Inventory Value 📦</h4>
          <h2>₹ {summary.totalInventoryValue.toLocaleString('en-IN')}</h2>
          <p>From {summary.productCount} products</p>
        </div>
      </section>

       <div className="content-container" style={{marginTop: '30px'}}>
         <h3>More Reports Coming Soon...</h3>
         <p>Future enhancements can include sales trends charts, top-selling products, and profit margins.</p>
      </div>
    </div>
  );
}

export default Reports;