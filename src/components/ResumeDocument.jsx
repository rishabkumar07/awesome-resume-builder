import React from 'react';
import { Document, Page, View, Text, StyleSheet, Font } from '@react-pdf/renderer';

const styles = StyleSheet.create({
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica',
    fontSize: 12,
  },
  section: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
    borderBottom: '1px solid #000',
    paddingBottom: 4,
  },
  subHeading: {
    fontSize: 14,
    marginBottom: 5,
    fontWeight: 'bold',
  },
  text: {
    fontSize: 12,
    marginBottom: 3,
  },
  listItem: {
    marginBottom: 8,
  },
  listItemHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  listItemTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  listItemDetails: {
    fontSize: 11,
    color: '#555',
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
  },
  skillItem: {
    backgroundColor: '#eee',
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 3,
    fontSize: 10,
  },
});

const ResumeDocument = ({ resume }) => (
  <Document>
    <Page size="A4" style={styles.page}>

      {/* Personal Information */}
      <View style={styles.section}>
        <Text style={{ fontSize: 24, fontWeight: 'bold', marginBottom: 5 }}>{resume.name}</Text>
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

export default ResumeDocument;
