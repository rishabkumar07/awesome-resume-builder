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
    </div>
  );
};

export default SkillItemForm;
