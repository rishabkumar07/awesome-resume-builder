import React from 'react';
import useResumeEditor from '../utils/hooks/useResumeEditor';
import usePdfGenerator from '../utils/hooks/usePdfGenerator';
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

const ResumeTemplate = ({ initialData }) => {
  const {
    resume,
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
  } = useResumeEditor(initialData);

  const { targetRef, isPdfGenerating, generatePdf } = usePdfGenerator();

  const handleDownloadPDF = () => {
    generatePdf(resume.name || 'resume');
  };

  return (
    <div className="mt-6 bg-gray-50 p-8 rounded-lg border shadow-sm max-w-7xl mx-auto">
      <div className="flex justify-between items-center mb-8">
        <h3 className="text-2xl font-semibold">Edit Your Resume</h3>
        <div className="flex items-center space-x-4">
          <label className="text-gray-700">Template:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="p-2 border rounded bg-white"
          >
            <option value="modern">Modern</option>
            <option value="classic">Classic</option>
            <option value="minimal">Minimal</option>
            <option value="professional">Professional</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        {/* Editable form */}
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
        </div>

        {/* Preview for PDF */}
        <div className="flex flex-col">
          <div
            ref={targetRef} // Use targetRef from usePdfGenerator
            className={`p-8 rounded border mb-4 h-[800px] overflow-auto ${
              theme === 'modern'
                ? 'bg-white text-gray-800 font-sans'
                : theme === 'classic'
                ? 'bg-yellow-50 text-gray-900 font-serif'
                : theme === 'professional'
                ? 'bg-blue-50 text-gray-800 font-sans'
                : 'bg-gray-100 text-gray-700 font-light'
            }`}
          >
            <PersonalInfoPreview
              name={resume.name}
              email={resume.email}
              phone={resume.phone}
              theme={theme}
            />

            <PreviewSection
              title="Education"
              items={resume.education}
              theme={theme}
              renderItemPreview={(item) => <EducationItemPreview item={item} />}
            />

            <PreviewSection
              title="Work Experience"
              items={resume.work_experience}
              theme={theme}
              renderItemPreview={(item) => <WorkExperienceItemPreview item={item} />}
            />

            <PreviewSection
              title="Projects"
              items={resume.projects}
              theme={theme}
              renderItemPreview={(item) => <ProjectItemPreview item={item} />}
            />

            <PreviewSection
              title="Skills"
              items={resume.skills}
              theme={theme}
              renderItemPreview={(skill) => <SkillItemPreview skill={skill} />}
            />

            <PreviewSection
              title="Certifications"
              items={resume.certifications}
              theme={theme}
              renderItemPreview={(item) => <CertificationItemPreview item={item} />}
            />
          </div>

          {/* Action buttons */}
          <div className="flex flex-wrap gap-3 mt-4 justify-center">
            <button
              onClick={handleSaveToLocal}
              className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
            >
              Save to Local Storage
            </button>
            <button
              onClick={handleLoadFromLocal}
              className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
            >
              Load from Local Storage
            </button>
            <button
              onClick={handleDownloadPDF}
              className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700 disabled:bg-purple-400"
              disabled={isPdfGenerating}
            >
              {isPdfGenerating ? (
                <span className="flex items-center justify-center">
                  <svg className="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Generating PDF...
                </span>
              ) : (
                'Download as PDF'
              )}
            </button>
            <button
              onClick={handleExportJSON}
              className="bg-gray-600 text-white px-4 py-2 rounded hover:bg-gray-700"
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
