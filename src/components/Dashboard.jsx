import React, { useState } from 'react';

const Dashboard = ({ data, onNavigateToAssets }) => {
  // Calculate percentages for pie chart
  const assignedPercent = (data.assetDistribution.assigned / data.totalAssets) * 100;
  const unassignedPercent = (data.assetDistribution.unassigned / data.totalAssets) * 100;
  const defectPercent = (data.assetDistribution.defect / data.totalAssets) * 100;

  // State for hover information
  const [hoverInfo, setHoverInfo] = useState(null);
  const [barHoverInfo, setBarHoverInfo] = useState(null);

  // Handle pie chart segment hover
  const handlePieHover = (type, value, percent, event) => {
    const rect = event.target.getBoundingClientRect();
    setHoverInfo({
      type,
      value,
      percent,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  // Handle bar chart segment hover
  const handleBarHover = (type, value, percent, event) => {
    const rect = event.target.getBoundingClientRect();
    setBarHoverInfo({
      type,
      value,
      percent,
      x: rect.left + rect.width / 2,
      y: rect.top - 10
    });
  };

  // Handle mouse leave
  const handleMouseLeave = () => {
    setHoverInfo(null);
    setBarHoverInfo(null);
  };

  return (
    <div className="dashboard-container">
      <h1 className="dashboard-title">Dashboard</h1>
      
      {/* Updated metrics grid with new card design */}
      <div className="metrics-grid">
        <MetricCard 
          title="Total Assets" 
          value={data.totalAssets} 
          description="All assets in the system"
        />
        <MetricCard 
          title="Active Assets" 
          value={data.activeAssets} 
          description="Currently active assets"
        />
        <MetricCard 
          title="Unassigned" 
          value={data.unassigned} 
          description="Assets not assigned to users"
        />
        <MetricCard 
          title="Defects" 
          value={data.defects} 
          description="Assets with issues"
        />
      </div>
      
      <div className="charts-grid">
        {/* Asset Distribution Pie Chart */}
        <div className="chart-card">
          <h2 className="chart-title">Asset Distribution</h2>
          <div style={{ display: 'flex', alignItems: 'center', gap: '2rem' }}>
            {/* Pie Chart Visualization */}
            <div className="pie-chart">
              <svg width="120" height="120" viewBox="0 0 120 120">
                {/* Assigned segment (Green) */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="transparent"
                  stroke="#10b981"
                  strokeWidth="30"
                  strokeDasharray={`${assignedPercent} ${100 - assignedPercent}`}
                  strokeDashoffset="25"
                  transform="rotate(-90 60 60)"
                  onMouseEnter={(e) => handlePieHover('Assigned', data.assetDistribution.assigned, assignedPercent, e)}
                  onMouseLeave={handleMouseLeave}
                  className="pie-segment"
                />
                {/* Unassigned segment (Yellow) */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="transparent"
                  stroke="#f59e0b"
                  strokeWidth="30"
                  strokeDasharray={`${unassignedPercent} ${100 - unassignedPercent}`}
                  strokeDashoffset={25 - assignedPercent}
                  transform="rotate(-90 60 60)"
                  onMouseEnter={(e) => handlePieHover('Unassigned', data.assetDistribution.unassigned, unassignedPercent, e)}
                  onMouseLeave={handleMouseLeave}
                  className="pie-segment"
                />
                {/* Defect segment (Red) */}
                <circle
                  cx="60"
                  cy="60"
                  r="50"
                  fill="transparent"
                  stroke="#ef4444"
                  strokeWidth="30"
                  strokeDasharray={`${defectPercent} ${100 - defectPercent}`}
                  strokeDashoffset={25 - assignedPercent - unassignedPercent}
                  transform="rotate(-90 60 60)"
                  onMouseEnter={(e) => handlePieHover('Defect', data.assetDistribution.defect, defectPercent, e)}
                  onMouseLeave={handleMouseLeave}
                  className="pie-segment"
                />
              </svg>
              <div className="pie-chart-center">
                {data.totalAssets}
              </div>
              
              {/* Hover tooltip for pie chart */}
              {hoverInfo && (
                <div 
                  className="chart-tooltip"
                  style={{
                    left: hoverInfo.x,
                    top: hoverInfo.y,
                    transform: 'translateX(-50%)'
                  }}
                >
                  <div className="tooltip-title">{hoverInfo.type}</div>
                  <div className="tooltip-value">{hoverInfo.value} assets</div>
                  <div className="tooltip-percent">{hoverInfo.percent.toFixed(1)}%</div>
                </div>
              )}
            </div>
            
            {/* Legend */}
            <div className="chart-legend">
              <div className="legend-item">
                <div className="legend-color legend-assigned"></div>
                <span>Assigned: {data.assetDistribution.assigned}</span>
              </div>
              <div className="legend-item">
                <div className="legend-color legend-unassigned"></div>
                <span>Unassigned: {data.assetDistribution.unassigned}</span>
              </div>
              <div className="legend-item">
                <div className="legend-color legend-defect"></div>
                <span>Defect: {data.assetDistribution.defect}</span>
              </div>
            </div>
          </div>
        </div>
        
        {/* Ownership Distribution Bar Chart */}
        <div className="chart-card">
          <h2 className="chart-title">Ownership Distribution</h2>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <span>Owned: {data.ownershipDistribution.owned}</span>
                <span>Leased: {data.ownershipDistribution.leased}</span>
              </div>
              <div className="bar-chart">
                <div 
                  className="bar-segment bar-owned" 
                  style={{ width: `${(data.ownershipDistribution.owned / data.totalAssets) * 100}%` }}
                  onMouseEnter={(e) => handleBarHover('Owned', data.ownershipDistribution.owned, (data.ownershipDistribution.owned / data.totalAssets) * 100, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  {data.ownershipDistribution.owned} Owned
                </div>
                <div 
                  className="bar-segment bar-leased" 
                  style={{ width: `${(data.ownershipDistribution.leased / data.totalAssets) * 100}%` }}
                  onMouseEnter={(e) => handleBarHover('Leased', data.ownershipDistribution.leased, (data.ownershipDistribution.leased / data.totalAssets) * 100, e)}
                  onMouseLeave={handleMouseLeave}
                >
                  {data.ownershipDistribution.leased} Leased
                </div>
                
                {/* Hover tooltip for bar chart */}
                {barHoverInfo && (
                  <div 
                    className="chart-tooltip"
                    style={{
                      left: barHoverInfo.x,
                      top: barHoverInfo.y,
                      transform: 'translateX(-50%)'
                    }}
                  >
                    <div className="tooltip-title">{barHoverInfo.type}</div>
                    <div className="tooltip-value">{barHoverInfo.value} assets</div>
                    <div className="tooltip-percent">{barHoverInfo.percent.toFixed(1)}%</div>
                  </div>
                )}
              </div>
            </div>
            
            {/* License Distribution */}
            <div>
              <h3 style={{ marginBottom: '1rem', fontSize: '1rem', fontWeight: '600' }}>O365 License Distribution</h3>
              <div className="license-grid">
                <div className="license-item">
                  <span>Basic:</span>
                  <span>{data.licenseDistribution.basic}</span>
                </div>
                <div className="license-item">
                  <span>Standard:</span>
                  <span>{data.licenseDistribution.standard}</span>
                </div>
                <div className="license-item">
                  <span>EMS E3:</span>
                  <span>{data.licenseDistribution.emsE3}</span>
                </div>
                <div className="license-item">
                  <span>Pinochie:</span>
                  <span>{data.licenseDistribution.pinochie}</span>
                </div>
                <div className="license-item">
                  <span>Reziyens:</span>
                  <span>{data.licenseDistribution.reziyens}</span>
                </div>
                <div className="license-item">
                  <span>Kyureeus:</span>
                  <span>{data.licenseDistribution.kyureeus}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <button 
        onClick={onNavigateToAssets}
        className="button"
        style={{ marginTop: '2rem' }}
      >
        View All Assets
      </button>
    </div>
  );
};

// New MetricCard component with the updated design
const MetricCard = ({ title, value, description }) => {
  return (
    <div className="metric-card-new">
      <div className="card-details">
        <p className="text-title">{title}</p>
        <p className="text-value">{value}</p>
        <p className="text-body">{description}</p>
      </div>
      <button className="card-button">View details</button>
    </div>
  );
};

export default Dashboard;