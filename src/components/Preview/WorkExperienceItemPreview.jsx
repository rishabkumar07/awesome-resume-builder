const WorkExperienceItemPreview = ({ item, themeStyles }) => {
  return (
    <div style={themeStyles.listItem}>
      <div style={themeStyles.listItemHeader}>
        <span style={themeStyles.listItemTitle}>{item.title}</span>
        <span style={themeStyles.listItemDetails}>{item.company}</span>
      </div>
      <div style={themeStyles.listItemDetails}>{item.date_range}</div>
      <div style={{...themeStyles.text, ...themeStyles.mt}}>{item.description}</div>
    </div>
  );
};

export default WorkExperienceItemPreview;
