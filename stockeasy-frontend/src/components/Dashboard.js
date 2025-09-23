import React, { useContext } from 'react';
import KpiCard from './KpiCard';
import { SettingsContext } from '../context/SettingsContext';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const getLocalDateString = (date) => {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
};

function Dashboard({ products, sales }) {
  const { lowStockThreshold } = useContext(SettingsContext);

  if (!products || !sales) {
    return <div className="dashboard-content"><h1>Loading Dashboard...</h1></div>;
  }

  const todaysDateStr = getLocalDateString(new Date());

  const todaysRevenue = sales
    .filter(sale => sale.sale_date && sale.sale_date.startsWith(todaysDateStr))
    .reduce((total, sale) => total + parseFloat(sale.total_amount), 0);

  const lowStockCount = products.filter(p => p.stock > 0 && p.stock <= lowStockThreshold).length;

  const processChartData = () => {
    const last7Days = {};
    for (let i = 6; i >= 0; i--) {
      const d = new Date();
      d.setDate(d.getDate() - i);
      const dateString = getLocalDateString(d);
      last7Days[dateString] = { sales: 0 };
    }

    sales.forEach(sale => {
      if (sale.sale_date) {
        const saleDateStr = sale.sale_date.slice(0, 10);
        if (last7Days[saleDateStr]) {
          last7Days[saleDateStr].sales += parseFloat(sale.total_amount);
        }
      }
    });
    
    // ▼▼▼ FIX IS HERE ▼▼▼
    // Hum ab ek naye aur zyada reliable tareeke se weekday ka naam nikaal rahe hain.
    const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    return Object.entries(last7Days).map(([dateString, data]) => {
        // YYYY-MM-DD string se ek UTC date object banate hain
        const dateObj = new Date(`${dateString}T12:00:00Z`);
        
        return {
            name: weekdays[dateObj.getUTCDay()], // getUTCDay() hamesha UTC ke hisaab se (0-6) number deta hai
            sales: data.sales
        };
    });
    // ▲▲▲ FIX ENDS HERE ▲▲▲
  };
  
  const chartData = processChartData();
  
  const formatYAxisTick = (value) => {
    if (value >= 100000) return `₹${Math.round(value / 100000)}L`;
    if (value >= 1000) return `₹${Math.round(value / 1000)}K`;
    return `₹${value}`;
  };

  return (
    <div className="dashboard-content">
      <header className="dashboard-header">
        <div className="header-greeting"><h1>Welcome back, User!</h1></div>
      </header>
      <main className="main-content">
        <section className="kpi-section">
          <KpiCard title="Today's Revenue" icon="💰" value={`₹ ${todaysRevenue.toLocaleString('en-IN')}`} change="Live Calculation" changeType="success" />
          <KpiCard title="Total Products" icon="📦" value={`${products.length} Active`} change="From Database" />
          <KpiCard title="Low Stock Items" icon="⚠️" value={`${lowStockCount} Products`} change={`Threshold: ${lowStockThreshold}`} changeType="danger" />
          <KpiCard title="Total Sales Orders" icon="🛒" value={`${sales.length} Orders`} change="All Time" />
        </section>
        <div className="dashboard-middle">
          <section className="chart-container">
            <h3>Sales Overview (Last 7 Days)</h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={chartData} margin={{ top: 5, right: 20, left: -10, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis tickFormatter={formatYAxisTick} domain={[0, 'auto']} width={80} />
                <Tooltip formatter={(value) => `₹${value.toLocaleString('en-IN')}`} />
                <Legend />
                <Bar dataKey="sales" fill="#007bff" />
              </BarChart>
            </ResponsiveContainer>
          </section>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;