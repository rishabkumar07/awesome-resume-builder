import React from 'react';

const EditableListSection = ({
  title,
  items,
  onAddItem,
  onRemoveItem,
  renderItemForm,
  sectionKey, // Key for the section (e.g., 'education', 'work_experience')
}) => {
  return (
    <div className="mb-4">
      <h4 className="font-medium mb-2 text-gray-700 border-b pb-2">{title}</h4>
      {items.map((item, index) => (
        <div key={index} className="mb-3 p-3 bg-gray-50 rounded border">
          <div className="flex justify-between mb-2">
            <h5 className="font-medium">{title} #{index + 1}</h5>
            <button
              onClick={() => onRemoveItem(sectionKey, index)}
              className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors duration-200 cursor-pointer"
            >
              Remove
            </button>
          </div>
          {renderItemForm(item, index)}
        </div>
      ))}
      <button
        onClick={() => onAddItem(sectionKey)}
        className="bg-green-500 text-white px-3 py-1 rounded text-sm hover:bg-green-600 transition-colors duration-200 cursor-pointer"
      >
        + Add {title}
      </button>
    </div>
  );
};

export default EditableListSection;
