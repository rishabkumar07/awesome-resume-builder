import React from 'react';

const CertificationItemForm = ({ item, index, onObjectFieldChange }) => {
  return (
    <>
      <input
        type="text"
        value={item.name || ''}
        onChange={(e) => onObjectFieldChange('certifications', index, 'name', e.target.value)}
        placeholder="Certification Name"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={item.issuer || ''}
        onChange={(e) => onObjectFieldChange('certifications', index, 'issuer', e.target.value)}
        placeholder="Issuing Organization"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={item.date || ''}
        onChange={(e) => onObjectFieldChange('certifications', index, 'date', e.target.value)}
        placeholder="Date Issued"
        className="w-full p-2 border rounded"
      />
    </>
  );
};

export default CertificationItemForm;
