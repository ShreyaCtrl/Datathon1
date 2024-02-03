import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    // Access the selected file using event.target.files
    const file = event.target.files[0];

    // Update the state with the selected file
    setSelectedFile(file);
  };

  return (
    <div>

      <input type="file" accept=".pdf" onChange={handleFileChange} />
      {selectedFile && (
        <p>Selected file: {selectedFile.name}</p>
      )}
<Button variant="primary">Submit</Button>

    </div>
  );
};

export default FileUploadComponent;
