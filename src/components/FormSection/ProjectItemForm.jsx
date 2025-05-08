import React from 'react';

const ProjectItemForm = ({ item, index, onObjectFieldChange }) => {
  return (
    <>
      <input
        type="text"
        value={item.title || ''}
        onChange={(e) => onObjectFieldChange('projects', index, 'title', e.target.value)}
        placeholder="Project Title"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={item.technologies || ''}
        onChange={(e) => onObjectFieldChange('projects', index, 'technologies', e.target.value)}
        placeholder="Technologies Used"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="text"
        value={item.date_range || ''}
        onChange={(e) => onObjectFieldChange('projects', index, 'date_range', e.target.value)}
        placeholder="Date Range (optional)"
        className="w-full p-2 border rounded mb-2"
      />
      <textarea
        value={item.description || ''}
        onChange={(e) => onObjectFieldChange('projects', index, 'description', e.target.value)}
        placeholder="Project Description"
        className="w-full p-2 border rounded h-24"
      ></textarea>
    </>
  );
};

export default ProjectItemForm;
