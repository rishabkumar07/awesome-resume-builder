import useResumeEditor from '../utils/hooks/useResumeEditor';
import PersonalInfoForm from './FormSection/PersonalInfoForm';
import EditableListSection from './EditableListSection';
import EducationItemForm from './FormSection/EducationItemForm';
import WorkExperienceItemForm from './FormSection/WorkExperienceItemForm';
import ProjectItemForm from './FormSection/ProjectItemForm';
import SkillItemForm from './FormSection/SkillItemForm';
import CertificationItemForm from './FormSection/CertificationItemForm';
import PersonalInfoPreview from './Preview/PersonalInfoPreview';
import PreviewSection from './Preview/PreviewSection';
import EducationItemPreview from './Preview/EducationItemPreview';
import WorkExperienceItemPreview from './Preview/WorkExperienceItemPreview';
import ProjectItemPreview from './Preview/ProjectItemPreview';
import SkillItemPreview from './Preview/SkillItemPreview';
import CertificationItemPreview from './Preview/CertificationItemPreview';
import { PDFDownloadLink } from '@react-pdf/renderer';
import ResumeDocument from './ResumeDocument';
import { getThemeStyles } from '../assets/styles/resumeThemes';
import CustomSectionManager from './CustomSectionManager';

const ResumeTemplate = ({ initialData }) => {
  const {
    resume,
    setResume,
    theme,
    setTheme,
    handleFieldChange,
    handleListChange,
    handleAddItem,
    handleRemoveItem,
    handleObjectFieldChange,
    handleSaveToLocal,
    handleLoadFromLocal,
    handleExportJSON,
    handleAddCustomSection,
    handleRemoveCustomSection,
    handleAddCustomSectionItem,
  } = useResumeEditor(initialData);

  const currentThemeStyles = getThemeStyles(theme);

  return (
    <div className="mt-6 bg-gray-50 p-8 rounded-lg border shadow-sm max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold">Edit Your Resume</h3>
        <div className="flex items-center space-x-3">
          <label className="text-gray-700 font-medium">Template:</label>
          <div className="relative">
            <select
              value={theme}
              onChange={(e) => setTheme(e.target.value)}
              className="appearance-none bg-white border border-gray-300 rounded-md pl-3 pr-10 py-2 text-gray-700 cursor-pointer focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200 shadow-sm hover:border-gray-400"
            >
              <option value="modern">Modern</option>
              <option value="classic">Classic</option>
              <option value="minimal">Minimal</option>
              <option value="professional">Professional</option>
            </select>
            <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
              <svg className="h-5 w-5" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </div>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <div className="bg-white p-6 rounded-lg shadow-sm border">
          <PersonalInfoForm
            name={resume.name}
            email={resume.email}
            phone={resume.phone}
            onFieldChange={handleFieldChange}
          />

          <EditableListSection
            title="Education"
            items={resume.education}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            sectionKey="education"
            renderItemForm={(item, index) => (
              <EducationItemForm
                item={item}
                index={index}
                onObjectFieldChange={handleObjectFieldChange}
              />
            )}
          />

          <EditableListSection
            title="Work Experience"
            items={resume.work_experience}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            sectionKey="work_experience"
            renderItemForm={(item, index) => (
              <WorkExperienceItemForm
                item={item}
                index={index}
                onObjectFieldChange={handleObjectFieldChange}
              />
            )}
          />

          <EditableListSection
            title="Projects"
            items={resume.projects}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            sectionKey="projects"
            renderItemForm={(item, index) => (
              <ProjectItemForm
                item={item}
                index={index}
                onObjectFieldChange={handleObjectFieldChange}
              />
            )}
          />

          <EditableListSection
            title="Skills"
            items={resume.skills}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            sectionKey="skills"
            renderItemForm={(item, index) => (
              <SkillItemForm
                item={item}
                index={index}
                onListChange={handleListChange}
                sectionKey="skills"
                onRemoveItem={handleRemoveItem}
              />
            )}
          />

          <EditableListSection
            title="Certifications"
            items={resume.certifications}
            onAddItem={handleAddItem}
            onRemoveItem={handleRemoveItem}
            sectionKey="certifications"
            renderItemForm={(item, index) => (
              <CertificationItemForm
                item={item}
                index={index}
                onObjectFieldChange={handleObjectFieldChange}
              />
            )}
          />

          <CustomSectionManager onAddSection={handleAddCustomSection} />

          {resume.custom_sections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="mb-4">
              <div className="flex justify-between items-center mb-2">
                <button
                  onClick={() => handleRemoveCustomSection(sectionIndex)}
                  className="bg-red-500 text-white px-2 py-1 rounded text-xs hover:bg-red-600 transition-colors duration-200 cursor-pointer"
                >
                  Remove Section
                </button>
              </div>
              
              <EditableListSection
                title={section.title}
                items={section.items}
                onAddItem={() => handleAddCustomSectionItem(sectionIndex)}
                onRemoveItem={(_, itemIndex) => {
                  const updatedSections = [...resume.custom_sections];
                  updatedSections[sectionIndex].items = 
                    updatedSections[sectionIndex].items.filter((_, i) => i !== itemIndex);
                  setResume(prev => ({ ...prev, custom_sections: updatedSections }));
                }}
                sectionKey={`custom_${sectionIndex}`}
                renderItemForm={(item, itemIndex) => (
                  <div>
                    <input
                      type="text"
                      value={item.title || ''}
                      onChange={(e) => {
                        const updatedSections = [...resume.custom_sections];
                        updatedSections[sectionIndex].items[itemIndex].title = e.target.value;
                        setResume(prev => ({ ...prev, custom_sections: updatedSections }));
                      }}
                      placeholder="Title"
                      className="w-full p-2 border rounded mb-2"
                    />
                    <textarea
                      value={item.description || ''}
                      onChange={(e) => {
                        const updatedSections = [...resume.custom_sections];
                        updatedSections[sectionIndex].items[itemIndex].description = e.target.value;
                        setResume(prev => ({ ...prev, custom_sections: updatedSections }));
                      }}
                      placeholder="Description"
                      className="w-full p-2 border rounded mb-2"
                      rows="3"
                    />
                  </div>
                )}
              />
            </div>
          ))}
        </div>

        {/* Preview for PDF */}
        <div className="flex flex-col">
          <div
            style={{
                backgroundColor: currentThemeStyles.page.backgroundColor,
                color: currentThemeStyles.page.color,
                fontFamily: currentThemeStyles.page.fontFamily,
                fontSize: currentThemeStyles.page.fontSize,
                lineHeight: currentThemeStyles.page.lineHeight,
            }}
            className={`p-8 rounded border mb-4 h-[800px] overflow-auto`}
          >
            <PersonalInfoPreview
              name={resume.name}
              email={resume.email}
              phone={resume.phone}
              themeStyles={currentThemeStyles}
            />

            <PreviewSection
              title="Education"
              items={resume.education}
              themeStyles={currentThemeStyles}
              renderItemPreview={(item, index, themeStyles) => <EducationItemPreview item={item} themeStyles={themeStyles} />}
            />

            <PreviewSection
              title="Work Experience"
              items={resume.work_experience}
              themeStyles={currentThemeStyles}
              renderItemPreview={(item, index, themeStyles) => <WorkExperienceItemPreview item={item} themeStyles={themeStyles} />}
            />

            <PreviewSection
              title="Projects"
              items={resume.projects}
              themeStyles={currentThemeStyles}
              renderItemPreview={(item, index, themeStyles) => <ProjectItemPreview item={item} themeStyles={themeStyles} />}
            />

            <PreviewSection
              title="Skills"
              items={resume.skills}
              themeStyles={currentThemeStyles}
              renderItemPreview={(skill, index, themeStyles) => <SkillItemPreview skill={skill} themeStyles={themeStyles} />}
            />

            <PreviewSection
              title="Certifications"
              items={resume.certifications}
              themeStyles={currentThemeStyles}
              renderItemPreview={(item, index, themeStyles) => <CertificationItemPreview item={item} themeStyles={themeStyles} />}
            />

            {/* Add custom sections to preview */}
            {resume.custom_sections.map((section, index) => (
              <PreviewSection
                key={index}
                title={section.title}
                items={section.items}
                themeStyles={currentThemeStyles}
                renderItemPreview={(item, idx, themeStyles) => (
                  <div style={themeStyles.listItem}>
                    <div style={themeStyles.listItemHeader}>
                      <span style={themeStyles.listItemTitle}>{item.title}</span>
                    </div>
                    <p style={themeStyles.text}>{item.description}</p>
                  </div>
                )}
              />
            ))}
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            <button
              onClick={handleSaveToLocal}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition-colors duration-200 cursor-pointer"
            >
              Save to Local Storage
            </button>
            <button
              onClick={handleLoadFromLocal}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 transition-colors duration-200 cursor-pointer"
            >
              Load from Local Storage
            </button>

            <PDFDownloadLink
              document={<ResumeDocument resume={resume} themeStyles={currentThemeStyles} />}
              fileName={`${resume.name.replace(/\s+/g, '_') || 'resume'}_resume.pdf`}
            >
              {({ blob, url, loading, error }) =>
                loading ? (
                  <button
                    className="bg-purple-400 text-white px-4 py-2 rounded cursor-not-allowed flex items-center justify-center"
                    disabled
                  >
                     <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    Generating PDF...
                  </button>
                ) : (
                  <button className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 transition-colors duration-200 cursor-pointer">
                    Download as PDF
                  </button>
                )
              }
            </PDFDownloadLink>

            <button
              onClick={handleExportJSON}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700 transition-colors duration-200 cursor-pointer"
            >
              Export as JSON
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResumeTemplate;
