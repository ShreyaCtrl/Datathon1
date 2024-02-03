import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';

const FileUploadComponent = () => {
  const [selectedFile, setSelectedFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
  };

  const handleSubmit = () => {
    if (!selectedFile) {
      alert('Please select a file before submitting.');
      return;
    }

    const formData = new FormData();
    formData.append('file', selectedFile);
   
   
    fetch('http://localhost:5000/summary', {
      method: 'POST',
      body: formData,
    })
      .then(response => response.json())
      .then(data => {
        console.log('File uploaded successfully:', data);
        
      })
      .catch(error => {
        console.error('Error uploading file:', error);
       
      });
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
      
    </div>
  );
};

export default FileUploadComponent;
