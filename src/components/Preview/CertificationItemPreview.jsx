import React from 'react';

const CertificationItemPreview = ({ item }) => {
  return (
    <div className="mb-1">
      <div className="flex justify-between">
        <span className="font-medium">{item.name}</span>
        <span className="text-gray-600">{item.issuer}</span>
      </div>
      <div className="text-gray-600">{item.date}</div>
    </div>
  );
};

export default CertificationItemPreview;
