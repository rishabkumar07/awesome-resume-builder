import React from 'react';

const WorkExperienceItemForm = ({ item, index, onObjectFieldChange }) => {
  return (
    <>
      <input
        type="text"
        value={item.title || ''}
        onChange={(e) => onObjectFieldChange('work_experience', index, 'title', e.target.value)}
        placeholder="Job Title"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={item.company || ''}
        onChange={(e) => onObjectFieldChange('work_experience', index, 'company', e.target.value)}
        placeholder="Company"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={item.date_range || ''}
        onChange={(e) => onObjectFieldChange('work_experience', index, 'date_range', e.target.value)}
        placeholder="Date Range (e.g., Jan 2020 - Present)"
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        value={item.description || ''}
        onChange={(e) => onObjectFieldChange('work_experience', index, 'description', e.target.value)}
        placeholder="Job Description"
        className="w-full p-2 border rounded h-24"
      ></textarea>
    </>
  );
};

export default WorkExperienceItemForm;
