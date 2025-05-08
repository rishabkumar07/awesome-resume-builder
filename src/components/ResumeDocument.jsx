import { Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer';

const createStyles = (themeStyles) => StyleSheet.create({
  page: themeStyles.page,
  section: themeStyles.section,
  heading: themeStyles.heading,
  subHeading: themeStyles.subHeading,
  text: themeStyles.text,
  listItem: themeStyles.listItem,
  listItemHeader: themeStyles.listItemHeader,
  listItemTitle: themeStyles.listItemTitle,
  listItemDetails: themeStyles.listItemDetails,
  skillsContainer: themeStyles.skillsContainer,
  skillItem: themeStyles.skillItem,
  personalInfoHeading: themeStyles.personalInfoHeading,
});

const ResumeDocument = ({ resume, themeStyles }) => {
  const styles = createStyles(themeStyles);

  return (
    <Document>
      <Page size="A4" style={styles.page}>

        {/* Personal Information */}
        <View style={styles.section}>
          <Text style={styles.personalInfoHeading || { fontSize: 24, fontWeight: 'bold', marginBottom: 5, color: styles.page.color }}>{resume.name}</Text>
          <Text style={styles.text}>{resume.email} | {resume.phone}</Text>
        </View>

        {/* Education */}
        {resume.education && resume.education.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Education</Text>
            {resume.education.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.listItemHeader}>
                  <Text style={styles.listItemTitle}>{item.degree}</Text>
                  <Text style={styles.listItemDetails}>{item.institution}</Text>
                </View>
                <Text style={styles.listItemDetails}>{item.date_range}</Text>
                {item.gpa && <Text style={styles.listItemDetails}>GPA: {item.gpa}</Text>}
              </View>
            ))}
          </View>
        )}

        {/* Work Experience */}
        {resume.work_experience && resume.work_experience.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Work Experience</Text>
            {resume.work_experience.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.listItemHeader}>
                  <Text style={styles.listItemTitle}>{item.title}</Text>
                  <Text style={styles.listItemDetails}>{item.company}</Text>
                </View>
                <Text style={styles.listItemDetails}>{item.date_range}</Text>
                <Text style={styles.text}>{item.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Projects */}
        {resume.projects && resume.projects.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Projects</Text>
            {resume.projects.map((item, index) => (
              <View key={index} style={styles.listItem}>
                 <View style={styles.listItemHeader}>
                  <Text style={styles.listItemTitle}>{item.title}</Text>
                  <Text style={styles.listItemDetails}>{item.technologies}</Text>
                </View>
                <Text style={styles.listItemDetails}>{item.date_range}</Text>
                <Text style={styles.text}>{item.description}</Text>
              </View>
            ))}
          </View>
        )}

        {/* Skills */}
        {resume.skills && resume.skills.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Skills</Text>
            <View style={styles.skillsContainer}>
              {resume.skills.map((skill, index) => (
                <Text key={index} style={styles.skillItem}>{skill}</Text>
              ))}
            </View>
          </View>
        )}

        {/* Certifications */}
        {resume.certifications && resume.certifications.length > 0 && (
          <View style={styles.section}>
            <Text style={styles.heading}>Certifications</Text>
            {resume.certifications.map((item, index) => (
              <View key={index} style={styles.listItem}>
                <View style={styles.listItemHeader}>
                  <Text style={styles.listItemTitle}>{item.name}</Text>
                  <Text style={styles.listItemDetails}>{item.issuer}</Text>
                </View>
                <Text style={styles.listItemDetails}>{item.date}</Text>
              </View>
            ))}
          </View>
        )}

      </Page>
    </Document>
  );
};

export default ResumeDocument;
