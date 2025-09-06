// LicenseDistribution.js
import React from 'react';

const LicenseDistribution = ({ data }) => {
  return (
    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
      {Object.entries(data).map(([key, value]) => (
        <div key={key} className="p-2 border rounded">
          <div className="font-semibold capitalize">{key}:</div>
          <div>{value}</div>
        </div>
      ))}
    </div>
  );
};

export default LicenseDistribution;