const SkillItemPreview = ({ skill, themeStyles }) => {
  return (
    <span style={themeStyles.skillItem}>
      {skill}
    </span>
  );
};

export default SkillItemPreview;
