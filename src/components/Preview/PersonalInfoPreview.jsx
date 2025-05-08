const PersonalInfoPreview = ({ name, email, phone, themeStyles }) => {
  return (
    <div style={themeStyles.professional?.personalInfoHeading ? {} : { borderBottom: themeStyles.heading.borderBottom, paddingBottom: themeStyles.heading.paddingBottom }}>
      <h2 style={themeStyles.professional?.personalInfoHeading || { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: themeStyles.page.color }}>
        {name}
      </h2>
      <p style={{ ...themeStyles.text, marginBottom: themeStyles.section.marginBottom }}>
        {email} {email && phone && '|'} {phone}
      </p>
    </div>
  );
};

export default PersonalInfoPreview;
