import React, { useState } from 'react';

const CustomSectionManager = ({ onAddSection }) => {
  const [newSectionTitle, setNewSectionTitle] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (newSectionTitle.trim()) {
      onAddSection(newSectionTitle.trim());
      setNewSectionTitle('');
    }
  };

  return (
    <div className="mb-6 p-4 bg-blue-50 rounded border border-blue-100">
      <h4 className="font-medium text-gray-700 mb-3">Add Custom Section</h4>
      <form onSubmit={handleSubmit} className="flex gap-2">
        <input
          type="text"
          value={newSectionTitle}
          onChange={(e) => setNewSectionTitle(e.target.value)}
          placeholder="Enter section title (e.g., Volunteer Work)"
          className="flex-grow p-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
          disabled={!newSectionTitle.trim()}
        >
          Add Section
        </button>
      </form>
    </div>
  );
};

export default CustomSectionManager;
