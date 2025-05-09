const baseStyles = {
  page: {
    flexDirection: 'column',
    padding: 30,
    fontFamily: 'Helvetica', 
    fontSize: 12,
    lineHeight: 1.4,
  },
  section: {
    marginBottom: 15,
  },
  heading: {
    fontSize: 16,
    marginBottom: 8,
    fontWeight: 'bold',
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
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 2,
  },
  listItemTitle: {
    fontSize: 12,
    fontWeight: 'bold'
  },
  listItemDetails: {
    fontSize: 11,
    color: '#555',
    fontFamily: 'Times-Roman',
    marginTop: 2
  },
  skillsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    marginTop: 5,
    display: 'flex'
  },
  skillItem: {
    backgroundColor: '#eee',
    padding: 5,
    marginRight: 5,
    marginBottom: 5,
    borderRadius: 3,
    fontSize: 10,
  },
  mt: {
    marginTop: 2,
  }
};

//theme-specific styles
const themes = {
  modern: {
    page: {
      backgroundColor: '#ffffff',
      color: '#333333',
    },
    heading: {
      ...baseStyles.heading,
      color: '#2563eb', // Example blue color (hex)
      borderBottom: '1px solid #2563eb',
    },
    // Override other styles for modern theme
  },
  classic: {
    page: {
      backgroundColor: '#fff8e1', // Light yellow background
      color: '#424242', // Darker text
      fontFamily: 'Times-Roman', // Classic font
    },
    heading: {
      ...baseStyles.heading,
      borderBottom: '1px solid #424242',
    },
    // Override other styles for classic theme
  },
  professional: {
    page: {
      backgroundColor: '#e3f2fd', // Light blue background
      color: '#263238', // Darker text
    },
    heading: {
      ...baseStyles.heading,
      color: '#0d47a1', // Dark blue heading
      borderBottom: '2px solid #0d47a1', // Thicker border
    },
    personalInfoHeading: { // Specific style for personal info in professional theme
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 5,
        color: '#0d47a1',
        borderBottom: '4px solid #0d47a1',
        paddingBottom: 10,
    },
    // Override other styles for professional theme
  },
  minimal: {
    page: {
      backgroundColor: '#f5f5f5', // Light gray background
      color: '#424242',
    },
    heading: {
      ...baseStyles.heading,
      borderBottom: 'none', // No border
      marginBottom: 10,
    },
    section: {
        marginBottom: 20, // More space between sections
    }
    // Override other styles for minimal theme
  },
};

// Function to get combined styles for a given theme
export const getThemeStyles = (themeName) => {
  const theme = themes[themeName] || themes.modern; // Default to modern
  return {
    page: { ...baseStyles.page, ...theme.page },
    section: { ...baseStyles.section, ...theme.section },
    heading: { ...baseStyles.heading, ...theme.heading },
    subHeading: { ...baseStyles.subHeading, ...theme.subHeading },
    text: { ...baseStyles.text, ...theme.text },
    mt: { ...baseStyles.mt, ...theme.mt },
    listItem: { ...baseStyles.listItem, ...theme.listItem },
    listItemHeader: { ...baseStyles.listItemHeader, ...theme.listItemHeader },
    listItemTitle: { ...baseStyles.listItemTitle, ...theme.listItemTitle },
    listItemDetails: { ...baseStyles.listItemDetails, ...theme.listItemDetails },
    skillsContainer: { ...baseStyles.skillsContainer, ...theme.skillsContainer },
    skillItem: { ...baseStyles.skillItem, ...theme.skillItem },
    ...theme,
  };
};
