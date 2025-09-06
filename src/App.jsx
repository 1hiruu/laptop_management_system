import React, { useState } from 'react';
import Login from './components/Login';
import OTPVerification from './components/OTPVerification';
import Dashboard from './components/Dashboard';
import AssetList from './components/AssetList';
import './App.css';

// Mock data
// In your src/App.js file, find the dashboardData object and replace it with:
const dashboardData = {
  totalAssets: 4,
  activeAssets: 2,
  unassigned: 1,
  defects: 1,
  assetDistribution: {
    assigned: 2,
    unassigned: 1,
    defect: 1
  },
  ownershipDistribution: {
    owned: 2,
    leased: 2
  },
  licenseDistribution: {
    basic: 1,
    standard: 0,
    emsE3: 0,
    pinochie: 1,
    reziyens: 0,
    kyureeus: 0
  }
};

const assets = [
  {
    id: 1,
    name: "Nico Andersan",
    email: "abc@example.com",
    deviceId: "PLT-00123",
    status: "assigned",
    ownership: "leased",
    location: "Coimbatore",
    createdDate: "23/08/2025"
  },
  {
    id: 2,
    name: "Nico Andersan",
    email: "abc@example.com",
    deviceId: "PLT-001",
    status: "assigned",
    ownership: "owned",
    location: "Rest Of India",
    createdDate: "22/08/2025"
  },
  {
    id: 3,
    name: "John Doe",
    email: "john@example.com",
    deviceId: "PLT-002",
    status: "unassigned",
    ownership: "owned",
    location: "Bangalore",
    createdDate: "21/08/2025"
  },
  {
    id: 4,
    name: "Jane Smith",
    email: "jane@example.com",
    deviceId: "PLT-003",
    status: "defect",
    ownership: "leased",
    location: "Chennai",
    createdDate: "20/08/2025"
  }
];

function App() {
  const [currentPage, setCurrentPage] = useState('login');
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const handleLogin = () => {
    setCurrentPage('otp');
  };

  const handleVerify = () => {
    setIsLoggedIn(true);
    setCurrentPage('dashboard');
  };

  const handleNavigateToAssets = () => {
    setCurrentPage('assets');
  };

  const handleNavigateToDashboard = () => {
    setCurrentPage('dashboard');
  };

  if (!isLoggedIn) {
    if (currentPage === 'login') {
      return <Login onLogin={handleLogin} />;
    } else if (currentPage === 'otp') {
      return <OTPVerification onVerify={handleVerify} />;
    }
  }

  return (
    <div className="App">
      {currentPage === 'dashboard' && (
        <Dashboard 
          data={dashboardData} 
          onNavigateToAssets={handleNavigateToAssets} 
        />
      )}
      {currentPage === 'assets' && (
        <AssetList 
          assets={assets} 
          onNavigateToDashboard={handleNavigateToDashboard} 
        />
      )}
    </div>
  );
}

export default App;