// AssetDistribution.js
import React from 'react';

const AssetDistribution = ({ data }) => {
  const total = data.assigned + data.unassigned + data.defect;
  
  return (
    <div>
      <div className="flex justify-between mb-4">
        <div>
          <span className="font-semibold">Assigned:</span> {data.assigned}
        </div>
        <div>
          <span className="font-semibold">Unassigned:</span> {data.unassigned}
        </div>
        <div>
          <span className="font-semibold">Defect:</span> {data.defect}
        </div>
      </div>
      <div className="w-full bg-gray-200 rounded-full h-4 mb-2">
        <div 
          className="bg-green-600 h-4 rounded-full" 
          style={{ width: `${(data.assigned / total) * 100}%` }}
          title={`Assigned: ${data.assigned}`}
        ></div>
      </div>
      <div className="flex text-xs justify-between">
        <span>Assigned</span>
        <span>Unassigned</span>
        <span>Defect</span>
      </div>
    </div>
  );
};

export default AssetDistribution;