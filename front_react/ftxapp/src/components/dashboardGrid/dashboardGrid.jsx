import React from 'react';
import './dashboardGrid.css';

const DashboardGrid = ({ children, columns = 3, gap = '2rem', className = '' }) => {
  const gridStyle = {
    '--grid-columns': columns,
    '--grid-gap': gap
  };

  return (
    <div 
      className={`dashboard-grid ${className}`}
      style={gridStyle}
    >
      {children}
    </div>
  );
};

export default DashboardGrid;