import { useState } from 'react';
import ResumeTemplate from './ResumeTemplate';

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  
  // Get API URL from environment variables
  const apiUrl = import.meta.env.VITE_API_URL || '';

  const handleFileChange = (e) => {
    if (e.target.files[0]) {
      setFile(e.target.files[0]);
      setError(null);
    }
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file first");
      return;
    }

    if (file.type !== 'application/pdf') {
      setError("Please upload a PDF file");
      return;
    }

    setLoading(true);
    setError(null);

    try {
      const formData = new FormData();
      formData.append('resume', file);

      const response = await fetch(`${apiUrl}/api/upload`, {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to process resume');
      }

      const data = await response.json();
      setResumeData({
        name: data.data.name || '',
        email: data.data.email || '',
        phone: data.data.phone || '',
        education: data.data.education || [],
        work_experience: data.data.work_experience || [],
        projects: data.data.projects || [],
        skills: data.data.skills || [],
      });
    } catch (err) {
      setError(err.message || 'Something went wrong');
    } finally {
      setLoading(false);
    }
  };

  const handleBackToUpload = () => {
    setFile(null);
    setResumeData(null);
    setError(null);
  };

  return (
    <div className="container mx-auto bg-white p-6 rounded-lg shadow-md">
      {!resumeData ? (
        <>
          <h2 className="text-2xl font-semibold mb-4">Upload Your Resume</h2>
          <p className="mb-4 text-gray-600">Upload your PDF resume to extract information automatically</p>

          <div className="mb-4">
            <input
              type="file"
              accept=".pdf"
              onChange={handleFileChange}
              className="block w-full text-sm text-gray-500
                file:mr-4 file:py-2 file:px-4
                file:rounded file:border-0
                file:text-sm file:font-semibold
                file:bg-blue-50 file:text-blue-700
                file:cursor-pointer
                hover:file:bg-blue-100"
            />
          </div>

          <button
            onClick={handleUpload}
            className="w-full bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer disabled:bg-blue-300 disabled:cursor-not-allowed"
            disabled={loading || !file}
          >
            {loading ? 'Processing...' : 'Upload & Extract'}
          </button>

          {error && <p className="text-red-500 mt-4">{error}</p>}
        </>
      ) : (
        <>
          <button
            onClick={handleBackToUpload}
            className="mb-4 bg-gray-500 text-white px-3 py-1 rounded hover:bg-gray-600"
          >
            ← Back to Upload
          </button>
          <ResumeTemplate initialData={resumeData} />
        </>
      )}
    </div>
  );
};

export default ResumeUpload;
