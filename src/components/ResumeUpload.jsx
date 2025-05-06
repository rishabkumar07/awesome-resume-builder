import { useState } from "react";

const ResumeUpload = () => {
  const [file, setFile] = useState(null);
  const [resumeData, setResumeData] = useState(null);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
    setResumeData(null);
    setError(null);
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a PDF file first.");
      return;
    }

    const formData = new FormData();
    formData.append("resume", file);

    setLoading(true);
    setError(null);

    try {
      const response = await fetch("http://localhost:5000/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) 
        throw new Error("Failed to upload and process resume");

      const result = await response.json();
      setResumeData(result.data);
    } 
    catch (err) {
      console.error(err);
      setError(err.message);
    } 
    finally {
      setLoading(false);
    }
  };

  return (
    <div className="max-w-xl mx-auto p-4">
      <h2 className="text-2xl font-semibold mb-4">Upload Your Resume (PDF)</h2>
      <input
        type="file"
        accept=".pdf"
        onChange={handleFileChange}
        className="mb-4 cursor-pointer"
      />
      <button
        onClick={handleUpload}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700 cursor-pointer"
        disabled={loading}
      >
        {loading ? "Processing..." : "Upload & Extract"}
      </button>

      {error && <p className="text-red-500 mt-4">{error}</p>}

      {resumeData && (
        <div className="mt-4 bg-gray-100 p-4 rounded">
        <h2 className="text-xl font-semibold mb-2">Extracted Resume Data</h2>
        <pre className="text-sm bg-white p-2 rounded overflow-x-auto">
          {JSON.stringify(resumeData, null, 2)}
        </pre>
      </div>
      )}
    </div>
  );
};

export default ResumeUpload;
