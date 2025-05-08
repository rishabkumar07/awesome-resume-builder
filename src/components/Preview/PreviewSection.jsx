import React from 'react';

const PreviewSection = ({
  title,
  items,
  theme,
  renderItemPreview, // Function to render the preview for a single item
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  const headingClass = `font-semibold mb-2 ${
    theme === 'modern'
      ? 'text-lg text-blue-600'
      : theme === 'classic'
      ? 'border-b pb-1 text-lg'
      : theme === 'professional'
      ? 'text-blue-700 border-b border-gray-300 pb-1'
      : 'text-lg'
  }`;

  return (
    <section className="mb-4">
      <h3 className={headingClass}>
        {title}
      </h3>
      <div className={`space-y-${title === 'Skills' ? '2 flex flex-wrap gap-2' : '4'}`}>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            {renderItemPreview(item, idx)}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default PreviewSection;
