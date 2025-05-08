import React from 'react';

const PersonalInfoForm = ({ name, email, phone, onFieldChange }) => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-sm border">
      <h4 className="font-medium mb-4 text-gray-700 border-b pb-2">Personal Information</h4>
      <input
        type="text"
        value={name}
        onChange={(e) => onFieldChange('name', e.target.value)}
        placeholder="Name"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="email"
        value={email}
        onChange={(e) => onFieldChange('email', e.target.value)}
        placeholder="Email"
        className="w-full p-2 border rounded mb-2"
      />
      <input
        type="tel"
        value={phone}
        onChange={(e) => onFieldChange('phone', e.target.value)}
        placeholder="Phone"
        className="w-full p-2 border rounded mb-4"
      />
    </div>
  );
};

export default PersonalInfoForm;
