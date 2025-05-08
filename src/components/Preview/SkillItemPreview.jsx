import React from 'react';

const SkillItemPreview = ({ skill }) => {
  return (
    <span className="bg-gray-200 text-gray-800 px-3 py-1 rounded mr-2 mb-2">
      {skill}
    </span>
  );
};

export default SkillItemPreview;
