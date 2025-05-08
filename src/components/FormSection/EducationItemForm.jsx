import React from 'react';

const EducationItemForm = ({ item, index, onObjectFieldChange }) => {
  return (
    <>
      <input
        type="text"
        value={item.degree || ''}
        onChange={(e) => onObjectFieldChange('education', index, 'degree', e.target.value)}
        placeholder="Degree"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={item.institution || ''}
        onChange={(e) => onObjectFieldChange('education', index, 'institution', e.target.value)}
        placeholder="Institution"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={item.date_range || ''}
        onChange={(e) => onObjectFieldChange('education', index, 'date_range', e.target.value)}
        placeholder="Date Range (e.g., 2018-2022)"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={item.gpa || ''}
        onChange={(e) => onObjectFieldChange('education', index, 'gpa', e.target.value)}
        placeholder="GPA (optional)"
        className="w-full p-2 border rounded"
      />
    </>
  );
};

export default EducationItemForm;
