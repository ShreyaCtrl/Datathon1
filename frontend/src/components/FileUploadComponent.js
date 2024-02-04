import React, { useState } from "react";
import Button from "react-bootstrap/Button";

const FileUploadComponent = ({ onDataUploaded ,onFileSubmit ,onScoreSubmit , onLimitationSubmit}) => {
  const [selectedFile, setSelectedFile] = useState(null);
  const [summary, setSummary] = useState("");
  const [loading, setLoading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  
  const handleDownload = () => {
    // Create a blob with the data
    const blob = new Blob([summary], { type: "text/plain" });

    // Create a link element to trigger the download
    const link = document.createElement("a");
    link.href = URL.createObjectURL(blob);
    link.download = "summary.txt";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  const handleSubmit = async () => {
    const formData = new FormData();
    formData.append("pdf_file", selectedFile);
    if (selectedFile) {
      onFileSubmit(selectedFile);
      onScoreSubmit(selectedFile);
      onLimitationSubmit(selectedFile);
    } else {
      console.error("No file selected");
    }

    try {
      const response = await fetch("http://127.0.0.1:5000/generate_summary", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSummary(data.summary);
      onDataUploaded(data.summary);
    } catch (error) {
      console.error("Error:", error);
    }finally {
      setLoading(false);
    }
  };

  return (
    <div className='fe'>
      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {selectedFile && (
        <p>Selected file: {selectedFile.name}</p>
      )}
      <Button className='buttons' onClick={handleSubmit}>
        Submit
      </Button>
      {/* {summary && (
        <Button className="buttons" onClick={handleDownload}>
          Download Summary (TXT)
        </Button>
      )} */}
    </div>
  );
};

export default FileUploadComponent;
