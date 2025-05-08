import React from 'react';

const EducationItemPreview = ({ item }) => {
  return (
    <div className="mb-1">
      <div className="flex justify-between">
        <span className="font-medium">{item.degree}</span>
        <span className="text-gray-600">{item.institution}</span>
      </div>
      <div className="text-gray-600">{item.date_range}</div>
      {item.gpa && <div className="text-gray-600">GPA: {item.gpa}</div>}
    </div>
  );
};

export default EducationItemPreview;
