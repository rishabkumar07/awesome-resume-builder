import { useState, useRef, useEffect } from 'react';
import html2pdf from 'html2pdf.js';

const ResumeTemplate = ({ initialData }) => {
  const [resume, setResume] = useState(() => ({
    name: initialData?.name || '',
    email: initialData?.email || '',
    phone: initialData?.phone || '',
    education: initialData?.education || [],
    work_experience: initialData?.work_experience || [],
    projects: initialData?.projects || [],
    skills: initialData?.skills || [],
    certifications: initialData?.certifications || [],
  }));
  const [theme, setTheme] = useState('modern');
  const [isPdfGenerating, setIsPdfGenerating] = useState(false);
  const resumeRef = useRef();

  useEffect(() => {
    // Load from localStorage on mount (if exists)
    const savedResume = localStorage.getItem('resumeData');
    if (savedResume) {
      try {
        const parsed = JSON.parse(savedResume);
        setResume({
          name: parsed.name || '',
          email: parsed.email || '',
          phone: parsed.phone || '',
          education: parsed.education || [],
          work_experience: parsed.work_experience || [],
          projects: parsed.projects || [],
          skills: parsed.skills || [],
          certifications: parsed.certifications || [],
        });
      } catch (e) {
        console.error('Error parsing saved resume:', e);
      }
    }
  }, []);

  const handleFieldChange = (field, value) => {
    setResume((prev) => ({ ...prev, [field]: value }));
  };

  const handleListChange = (field, index, value) => {
    const updatedList = [...resume[field]];
    updatedList[index] = value;
    setResume((prev) => ({ ...prev, [field]: updatedList }));
  };

  const handleAddItem = (field) => {
    if (field === 'education') {
      setResume((prev) => ({ 
        ...prev, 
        [field]: [...prev[field], { degree: '', institution: '', date_range: '', gpa: '' }] 
      }));
    } else if (field === 'work_experience') {
      setResume((prev) => ({ 
        ...prev, 
        [field]: [...prev[field], { title: '', company: '', date_range: '', description: '' }] 
      }));
    } else if (field === 'projects') {
      setResume((prev) => ({ 
        ...prev, 
        [field]: [...prev[field], { title: '', technologies: '', date_range: '', description: '' }] 
      }));
    } else if (field === 'certifications') {
      setResume((prev) => ({ 
        ...prev, 
        [field]: [...prev[field], { name: '', issuer: '', date: '' }] 
      }));
    } else {
      setResume((prev) => ({ ...prev, [field]: [...prev[field], ''] }));
    }
  };

  const handleRemoveItem = (field, index) => {
    const updatedList = resume[field].filter((_, i) => i !== index);
    setResume((prev) => ({ ...prev, [field]: updatedList }));
  };

  const handleObjectFieldChange = (section, index, field, value) => {
    const updatedList = [...resume[section]];
    updatedList[index] = { ...updatedList[index], [field]: value };
    setResume((prev) => ({ ...prev, [section]: updatedList }));
  };

  const handleDownloadPDF = () => {
    const element = resumeRef.current;
    const options = {
      margin: 0.5,
      filename: `${resume.name.replace(/\s+/g, '_')}_resume.pdf`,
      image: { type: 'jpeg', quality: 0.98 },
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'in', format: 'letter', orientation: 'portrait' },
    };

    setIsPdfGenerating(true);

    html2pdf().from(element).set(options).save()
      .then(() => {
        console.log('PDF generated successfully');
        setIsPdfGenerating(false);
      }).catch(error => {
        console.error('Error generating PDF:', error);
        setIsPdfGenerating(false)
      });
  };

  const handleSaveToLocal = () => {
    localStorage.setItem('resumeData', JSON.stringify(resume));
    alert('Resume saved to local storage!');
  };

  const handleLoadFromLocal = () => {
    const savedResume = localStorage.getItem('resumeData');
    if (savedResume) {
      setResume(JSON.parse(savedResume));
      alert('Resume loaded from local storage!');
    } else {
      alert('No saved resume found in local storage.');
    }
  };

  const handleExportJSON = () => {
    const dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(resume, null, 2));
    const downloadAnchor = document.createElement('a');
    downloadAnchor.setAttribute('href', dataStr);
    downloadAnchor.setAttribute('download', 'resume.json');
    document.body.appendChild(downloadAnchor);
    downloadAnchor.click();
    document.body.removeChild(downloadAnchor);
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
          <h4 className="font-medium mb-4 text-gray-700 border-b pb-2">Personal Information</h4>
          <input
            type="text"
            value={resume.name}
            onChange={(e) => handleFieldChange('name', e.target.value)}
            placeholder="Name"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="email"
            value={resume.email}
            onChange={(e) => handleFieldChange('email', e.target.value)}
            placeholder="Email"
            className="w-full p-2 border rounded mb-2"
          />
          <input
            type="tel"
            value={resume.phone}
            onChange={(e) => handleFieldChange('phone', e.target.value)}
            placeholder="Phone"
            className="w-full p-2 border rounded mb-4"
          />

          <div className="mb-4">
            <h4 className="font-medium mb-2 text-gray-700 border-b pb-2">Education</h4>
            {resume.education.map((item, index) => (
              <div key={index} className="mb-3 p-3 bg-gray-50 rounded border">
                <div className="flex justify-between mb-2">
                  <h5 className="font-medium">Education #{index + 1}</h5>
                  <button
                    onClick={() => handleRemoveItem('education', index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={item.degree || ''}
                  onChange={(e) => handleObjectFieldChange('education', index, 'degree', e.target.value)}
                  placeholder="Degree"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={item.institution || ''}
                  onChange={(e) => handleObjectFieldChange('education', index, 'institution', e.target.value)}
                  placeholder="Institution"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={item.date_range || ''}
                  onChange={(e) => handleObjectFieldChange('education', index, 'date_range', e.target.value)}
                  placeholder="Date Range (e.g., 2018-2022)"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={item.gpa || ''}
                  onChange={(e) => handleObjectFieldChange('education', index, 'gpa', e.target.value)}
                  placeholder="GPA (optional)"
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <button
              onClick={() => handleAddItem('education')}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              + Add Education
            </button>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2 text-gray-700 border-b pb-2">Work Experience</h4>
            {resume.work_experience.map((item, index) => (
              <div key={index} className="mb-3 p-3 bg-gray-50 rounded border">
                <div className="flex justify-between mb-2">
                  <h5 className="font-medium">Experience #{index + 1}</h5>
                  <button
                    onClick={() => handleRemoveItem('work_experience', index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => handleObjectFieldChange('work_experience', index, 'title', e.target.value)}
                  placeholder="Job Title"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={item.company || ''}
                  onChange={(e) => handleObjectFieldChange('work_experience', index, 'company', e.target.value)}
                  placeholder="Company"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={item.date_range || ''}
                  onChange={(e) => handleObjectFieldChange('work_experience', index, 'date_range', e.target.value)}
                  placeholder="Date Range (e.g., Jan 2020 - Present)"
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  value={item.description || ''}
                  onChange={(e) => handleObjectFieldChange('work_experience', index, 'description', e.target.value)}
                  placeholder="Job Description"
                  className="w-full p-2 border rounded h-24"
                ></textarea>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('work_experience')}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              + Add Work Experience
            </button>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2 text-gray-700 border-b pb-2">Projects</h4>
            {resume.projects.map((item, index) => (
              <div key={index} className="mb-3 p-3 bg-gray-50 rounded border">
                <div className="flex justify-between mb-2">
                  <h5 className="font-medium">Project #{index + 1}</h5>
                  <button
                    onClick={() => handleRemoveItem('projects', index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={item.title || ''}
                  onChange={(e) => handleObjectFieldChange('projects', index, 'title', e.target.value)}
                  placeholder="Project Title"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={item.technologies || ''}
                  onChange={(e) => handleObjectFieldChange('projects', index, 'technologies', e.target.value)}
                  placeholder="Technologies Used"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={item.date_range || ''}
                  onChange={(e) => handleObjectFieldChange('projects', index, 'date_range', e.target.value)}
                  placeholder="Date Range (optional)"
                  className="w-full p-2 border rounded mb-2"
                />
                <textarea
                  value={item.description || ''}
                  onChange={(e) => handleObjectFieldChange('projects', index, 'description', e.target.value)}
                  placeholder="Project Description"
                  className="w-full p-2 border rounded h-24"
                ></textarea>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('projects')}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              + Add Project
            </button>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2 text-gray-700 border-b pb-2">Skills</h4>
            {resume.skills.map((item, index) => (
              <div key={index} className="flex mb-2">
                <input
                  type="text"
                  value={item}
                  onChange={(e) => handleListChange('skills', index, e.target.value)}
                  className="flex-grow p-2 border rounded mr-2"
                  placeholder="Skill"
                />
                <button
                  onClick={() => handleRemoveItem('skills', index)}
                  className="bg-red-500 text-white px-2 rounded"
                >
                  ✕
                </button>
              </div>
            ))}
            <button
              onClick={() => handleAddItem('skills')}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              + Add Skill
            </button>
          </div>

          <div className="mb-4">
            <h4 className="font-medium mb-2 text-gray-700 border-b pb-2">Certifications</h4>
            {resume.certifications.map((item, index) => (
              <div key={index} className="mb-3 p-3 bg-gray-50 rounded border">
                <div className="flex justify-between mb-2">
                  <h5 className="font-medium">Certification #{index + 1}</h5>
                  <button
                    onClick={() => handleRemoveItem('certifications', index)}
                    className="bg-red-500 text-white px-2 py-1 rounded text-xs"
                  >
                    Remove
                  </button>
                </div>
                <input
                  type="text"
                  value={item.name || ''}
                  onChange={(e) => handleObjectFieldChange('certifications', index, 'name', e.target.value)}
                  placeholder="Certification Name"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={item.issuer || ''}
                  onChange={(e) => handleObjectFieldChange('certifications', index, 'issuer', e.target.value)}
                  placeholder="Issuing Organization"
                  className="w-full p-2 border rounded mb-2"
                />
                <input
                  type="text"
                  value={item.date || ''}
                  onChange={(e) => handleObjectFieldChange('certifications', index, 'date', e.target.value)}
                  placeholder="Date Issued"
                  className="w-full p-2 border rounded"
                />
              </div>
            ))}
            <button
              onClick={() => handleAddItem('certifications')}
              className="bg-green-500 text-white px-3 py-1 rounded text-sm"
            >
              + Add Certification
            </button>
          </div>
        </div>

        {/* Preview for PDF */}
        <div className="flex flex-col">
          <div
            ref={resumeRef}
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
            <div className={`${theme === 'professional' ? 'border-b-4 border-blue-500 pb-4' : ''}`}>
              <h2 className={`text-2xl font-bold mb-1 ${theme === 'professional' ? 'text-blue-700' : ''}`}>
                {resume.name}
              </h2>
              <p className="mb-4 text-sm">
                {resume.email} {resume.email && resume.phone && '|'} {resume.phone}
              </p>
            </div>

            {resume.education.length > 0 && (
              <section className="mb-4">
                <h3
                  className={`font-semibold mb-2 ${
                    theme === 'modern'
                      ? 'text-lg text-blue-600'
                      : theme === 'classic'
                      ? 'border-b pb-1 text-lg'
                      : theme === 'professional'
                      ? 'text-blue-700 border-b border-gray-300 pb-1'
                      : 'text-lg'
                  }`}
                >
                  Education
                </h3>
                <div className="space-y-2">
                  {resume.education.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.degree}</span>
                        <span className="text-gray-600">{item.institution}</span>
                      </div>
                      <div className="text-gray-600">{item.date_range}</div>
                      {item.gpa && <div className="text-gray-600">GPA: {item.gpa}</div>}
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resume.work_experience.length > 0 && (
              <section className="mb-4">
                <h3
                  className={`font-semibold mb-2 ${
                    theme === 'modern'
                      ? 'text-lg text-blue-600'
                      : theme === 'classic'
                      ? 'border-b pb-1 text-lg'
                      : theme === 'professional'
                      ? 'text-blue-700 border-b border-gray-300 pb-1'
                      : 'text-lg'
                  }`}
                >
                  Work Experience
                </h3>
                <div className="space-y-4">
                  {resume.work_experience.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-gray-600">{item.company}</span>
                      </div>
                      <div className="text-gray-600">{item.date_range}</div>
                      <div className="text-gray-600">{item.description}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resume.projects.length > 0 && (
              <section className="mb-4">
                <h3
                  className={`font-semibold mb-2 ${
                    theme === 'modern'
                      ? 'text-lg text-blue-600'
                      : theme === 'classic'
                      ? 'border-b pb-1 text-lg'
                      : theme === 'professional'
                      ? 'text-blue-700 border-b border-gray-300 pb-1'
                      : 'text-lg'
                  }`}
                >
                  Projects
                </h3>
                <div className="space-y-4">
                  {resume.projects.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.title}</span>
                        <span className="text-gray-600">{item.technologies}</span>
                      </div>
                      <div className="text-gray-600">{item.date_range}</div>
                      <div className="text-gray-600">{item.description}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {resume.skills.length > 0 && (
              <section className="mb-4">
                <h3
                  className={`font-semibold mb-2 ${
                    theme === 'modern'
                      ? 'text-lg text-blue-600'
                      : theme === 'classic'
                      ? 'border-b pb-1 text-lg'
                      : theme === 'professional'
                      ? 'text-blue-700 border-b border-gray-300 pb-1'
                      : 'text-lg'
                  }`}
                >
                  Skills
                </h3>
                <div className="flex flex-wrap gap-2">
                  {resume.skills.map((skill, idx) => (
                    <span key={idx} className="bg-gray-200 text-gray-800 px-3 py-1 rounded mr-2 mb-2">
                      {skill}
                    </span>
                  ))}
                </div>
              </section>
            )}

            {resume.certifications.length > 0 && (
              <section className="mb-4">
                <h3
                  className={`font-semibold mb-2 ${
                    theme === 'modern'
                      ? 'text-lg text-blue-600'
                      : theme === 'classic'
                      ? 'border-b pb-1 text-lg'
                      : theme === 'professional'
                      ? 'text-blue-700 border-b border-gray-300 pb-1'
                      : 'text-lg'
                  }`}
                >
                  Certifications
                </h3>
                <div className="space-y-4">
                  {resume.certifications.map((item, idx) => (
                    <div key={idx} className="mb-1">
                      <div className="flex justify-between">
                        <span className="font-medium">{item.name}</span>
                        <span className="text-gray-600">{item.issuer}</span>
                      </div>
                      <div className="text-gray-600">{item.date}</div>
                    </div>
                  ))}
                </div>
              </section>
            )}
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
