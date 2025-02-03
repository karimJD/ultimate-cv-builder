import React from 'react';
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Font,
} from '@react-pdf/renderer';

// Register fonts
Font.register({
  family: 'Open Sans',
  fonts: [
    {
      src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsjZ0B4gaVc.ttf',
    },
    {
      src: 'https://fonts.gstatic.com/s/opensans/v34/memSYaGs126MiZpBA-UvWbX2vVnXBbObj2OVZyOOSr4dVJWUgsg-1x4gaVc.ttf',
      fontWeight: 'bold',
    },
  ],
});

// Styles
const styles = StyleSheet.create({
  page: {
    padding: 30,
    fontFamily: 'Open Sans',
  },
  section: {
    marginBottom: 10,
  },
  header: {
    marginBottom: 20,
  },
  name: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  contactInfo: {
    fontSize: 10,
    marginBottom: 3,
  },
  sectionTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 5,
    borderBottom: '1 solid black',
    paddingBottom: 3,
  },
  experienceItem: {
    marginBottom: 10,
  },
  jobTitle: {
    fontSize: 12,
    fontWeight: 'bold',
  },
  companyInfo: {
    fontSize: 10,
    marginBottom: 3,
  },
  bulletPoint: {
    fontSize: 10,
    marginLeft: 15,
    marginBottom: 2,
  },
  skillsSection: {
    fontSize: 10,
    marginBottom: 3,
  },
  language: {
    fontSize: 10,
    marginBottom: 2,
  },
});

const CV = ({ cvData }) => {
  return (
    <Document>
      <Page size='A4' style={styles.page}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.name}>{cvData?.name}</Text>
          <Text style={styles.contactInfo}>
            {cvData?.contact_info?.email} • {cvData?.contact_info?.phone} •{' '}
            {cvData?.contact_info?.location}
          </Text>
          {cvData?.contact_info?.linkedin && (
            <Text style={styles.contactInfo}>
              {cvData?.contact_info?.linkedin}
            </Text>
          )}
          {cvData?.contact_info?.portfolio && (
            <Text style={styles.contactInfo}>
              {cvData?.contact_info?.portfolio}
            </Text>
          )}
        </View>

        {/* Summary */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Summary</Text>
          <Text style={styles.contactInfo}>{cvData?.summary}</Text>
        </View>

        {/* Skills */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Technical Skills</Text>
          <Text style={styles.skillsSection}>
            Programming Languages:{' '}
            {cvData?.skills?.programming_languages?.join(', ')}
          </Text>
          <Text style={styles.skillsSection}>
            Frameworks & Libraries:{' '}
            {cvData?.skills?.frameworks_libraries?.join(', ')}
          </Text>
          <Text style={styles.skillsSection}>
            Tools: {cvData?.skills?.tools?.join(', ')}
          </Text>
          {cvData?.skills?.other?.length > 0 && (
            <Text style={styles.skillsSection}>
              Other: {cvData?.skills?.other?.join(', ')}
            </Text>
          )}
        </View>

        {/* Experience */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Professional Experience</Text>
          {cvData?.experience?.map((exp, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{exp?.job_title}</Text>
              <Text style={styles.companyInfo}>
                {exp?.company} • {exp?.location} • {exp?.start_date} -{' '}
                {exp?.end_date}
              </Text>
              {exp?.responsibilities?.map((resp, idx) => (
                <Text key={idx} style={styles.bulletPoint}>
                  • {resp}
                </Text>
              ))}
            </View>
          ))}
        </View>

        {/* Education */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Education</Text>
          {cvData?.education?.map((edu, index) => (
            <View key={index} style={styles.experienceItem}>
              <Text style={styles.jobTitle}>{edu?.degree}</Text>
              <Text style={styles.companyInfo}>
                {edu?.institution} • {edu?.location}
              </Text>
            </View>
          ))}
        </View>

        {/* Languages */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Languages</Text>
          {Object.entries(cvData?.languages || {})
            .filter(([_, level]) => level) // Filter out empty levels
            .map(([language, level], index) => (
              <Text key={index} style={styles.language}>
                {language}: {level}
              </Text>
            ))}
        </View>
      </Page>
    </Document>
  );
};

export default CV;
