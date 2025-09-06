import React, { useState } from 'react';

const AssetList = ({ assets, onNavigateToDashboard }) => {
  const [searchTerm, setSearchTerm] = useState('');
  
  const filteredAssets = assets.filter(asset => 
    asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.deviceId.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.status.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.ownership.toLowerCase().includes(searchTerm.toLowerCase()) ||
    asset.location.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'assigned': return 'status-badge status-assigned';
      case 'unassigned': return 'status-badge status-unassigned';
      case 'defect': return 'status-badge status-defect';
      default: return 'status-badge';
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'assigned': return '✓';
      case 'unassigned': return '!';
      case 'defect': return '⚡';
      default: return '?';
    }
  };

  const getOwnershipIcon = (ownership) => {
    return ownership === 'owned' ? '★' : '⏳';
  };

  return (
    <div className="asset-container-new">
      <div className="asset-header-new">
        <div className="asset-header-top">
          <button 
            onClick={onNavigateToDashboard}
            className="back-button"
          >
            ← Back to Dashboard
          </button>
          <h1 className="asset-title-new">Asset Management</h1>
        </div>
        <p className="asset-subtitle">Manage and track all company assets</p>
        
        <div className="search-container">
        <input
  type="text"
  placeholder="Search assets..."
  className="search-input-button-style"
  value={searchTerm}
  onChange={(e) => setSearchTerm(e.target.value)}
/>
        </div>
      </div>
      
      <div className="asset-content">
        {filteredAssets.length === 0 ? (
          <div className="no-results">
            <p>No assets found matching your search.</p>
          </div>
        ) : (
          <div className="asset-grid">
            {filteredAssets.map((asset) => (
              <div key={asset.id} className="asset-card">
                <div className="asset-card-header">
                  <div className="asset-icon">
                    {getOwnershipIcon(asset.ownership)}
                  </div>
                  <div className="asset-status">
                    <span className={getStatusBadgeClass(asset.status)}>
                      {getStatusIcon(asset.status)} {asset.status}
                    </span>
                  </div>
                </div>
                
                <div className="asset-card-body">
                  <h3 className="asset-name">{asset.name}</h3>
                  <p className="asset-email">{asset.email}</p>
                  
                  <div className="asset-details">
                    <div className="asset-detail-item">
                      <span className="detail-label">Device ID:</span>
                      <span className="detail-value">{asset.deviceId}</span>
                    </div>
                    
                    <div className="asset-detail-item">
                      <span className="detail-label">Ownership:</span>
                      <span className="detail-value">{asset.ownership}</span>
                    </div>
                    
                    <div className="asset-detail-item">
                      <span className="detail-label">Location:</span>
                      <span className="detail-value">{asset.location}</span>
                    </div>
                    
                    <div className="asset-detail-item">
                      <span className="detail-label">Created:</span>
                      <span className="detail-value">{asset.createdDate}</span>
                    </div>
                  </div>
                </div>
                
                <div className="asset-card-footer">
                  <button className="asset-action-btn">View Details</button>
                  <button className="asset-action-btn secondary">Edit</button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetList;