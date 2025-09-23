import React from 'react';

function KpiCard({ title, value, change, icon, changeType }) {
  const changeClassName = changeType === 'success' ? 'success-text' : 'danger-text';
  return (
    <div className="kpi-card">
      <h4>{title} {icon}</h4>
      <h2>{value}</h2>
      <p className={changeClassName}>{change}</p>
    </div>
  );
}

export default KpiCard;