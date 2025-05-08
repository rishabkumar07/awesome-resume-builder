const EducationItemPreview = ({ item, themeStyles }) => {
  return (
    <div style={themeStyles.listItem}>
      <div style={themeStyles.listItemHeader}>
        <span style={themeStyles.listItemTitle}>{item.degree}</span>
        <span style={themeStyles.listItemDetails}>{item.institution}</span>
      </div>
      <div style={themeStyles.listItemDetails}>{item.date_range}</div>
      {item.gpa && <div style={themeStyles.listItemDetails}>GPA: {item.gpa}</div>}
    </div>
  );
};

export default EducationItemPreview;
