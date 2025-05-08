import React from 'react';

const SkillItemForm = ({ item, index, onListChange, sectionKey, onRemoveItem }) => {
  return (
    <div className="flex mb-2">
      <input
        type="text"
        value={item}
        onChange={(e) => onListChange(sectionKey, index, e.target.value)}
        className="flex-grow p-2 border rounded mr-2"
        placeholder="Skill"
      />
      <button
        onClick={() => onRemoveItem(sectionKey, index)}
        className="bg-red-500 text-white px-2 rounded"
      >
        ✕
      </button>
    </div>
  );
};

export default SkillItemForm;
