import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");


  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("pdf_file", selectedFile);

    try {
      const response = await fetch("http://127.0.0.1:5000/generate_summary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSummary(data.summary);
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {selectedFile && <p>Selected file: {selectedFile.name}</p>}
      <Button variant="primary" onClick={handleSubmit}>
        Submit
      </Button>
      {summary && (
        <div>
          <h2>Summary:</h2>
          <p>{summary}</p>
        </div>
      )}
    </div>
  );
};

export default FileUploadComponent;
