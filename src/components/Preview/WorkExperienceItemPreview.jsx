import React from 'react';

const WorkExperienceItemPreview = ({ item }) => {
  return (
    <div className="mb-1">
      <div className="flex justify-between">
        <span className="font-medium">{item.title}</span>
        <span className="text-gray-600">{item.company}</span>
      </div>
      <div className="text-gray-600">{item.date_range}</div>
      <div className="text-gray-600">{item.description}</div>
    </div>
  );
};

export default WorkExperienceItemPreview;
