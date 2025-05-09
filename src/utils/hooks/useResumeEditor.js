import { useState } from 'react';

const useResumeEditor = (initialData) => {
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

  const handleSaveToLocal = () => {
    localStorage.setItem('resumeData', JSON.stringify(resume));
    alert('Resume saved to local storage!');
  };

  const handleLoadFromLocal = () => {
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
        alert('Resume loaded from local storage!');
        return true;
      } catch (e) {
        console.error('Error parsing saved resume:', e);
        alert('Error loading resume from local storage.');
        return false;
      }
    } else {
      alert('No saved resume found in local storage.');
      return false;
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

  return {
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
  };
};

export default useResumeEditor;
