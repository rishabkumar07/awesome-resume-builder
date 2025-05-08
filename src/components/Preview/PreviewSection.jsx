import React from 'react';

const PreviewSection = ({
  title,
  items,
  themeStyles,
  renderItemPreview,
}) => {
  if (!items || items.length === 0) {
    return null;
  }

  const headingStyle = themeStyles.heading;

  return (
    <section style={themeStyles.section}>
      <h3 style={headingStyle}>
        {title}
      </h3>
      <div style={{
          flexDirection: themeStyles.skillsContainer.flexDirection,
          flexWrap: themeStyles.skillsContainer.flexWrap,
          gap: themeStyles.skillsContainer.gap,
          marginTop: themeStyles.skillsContainer.marginTop,
          ...(title !== 'Skills' && { display: 'flex', flexDirection: 'column', gap: '1rem' }) // Simulate space-y-4 with gap
      }}>
        {items.map((item, idx) => (
          <React.Fragment key={idx}>
            {renderItemPreview(item, idx, themeStyles)}
          </React.Fragment>
        ))}
      </div>
    </section>
  );
};

export default PreviewSection;
