const CertificationItemPreview = ({ item, themeStyles }) => {
  return (
    <div style={themeStyles.listItem}>
      <div style={themeStyles.listItemHeader}>
        <span style={themeStyles.listItemTitle}>{item.name}</span>
        <span style={themeStyles.listItemDetails}>{item.issuer}</span>
      </div>
      <div style={themeStyles.listItemDetails}>{item.date}</div>
    </div>
  );
};

export default CertificationItemPreview;
