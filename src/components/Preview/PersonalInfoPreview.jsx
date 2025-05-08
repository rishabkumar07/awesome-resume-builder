import React from 'react';

const PersonalInfoPreview = ({ name, email, phone, theme }) => {
  return (
    <div className={`${theme === 'professional' ? 'border-b-4 border-blue-500 pb-4' : ''}`}>
      <h2 className={`text-2xl font-bold mb-1 ${theme === 'professional' ? 'text-blue-700' : ''}`}>
        {name}
      </h2>
      <p className="mb-4 text-sm">
        {email} {email && phone && '|'} {phone}
      </p>
    </div>
  );
};

export default PersonalInfoPreview;
