import React, { useState, useEffect } from 'react';
import FileUploadComponent from './FileUploadComponent';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import axios from 'axios';
import Spinner from 'react-bootstrap/Spinner';

const Working = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(false); // Add loading state

  const handleFileSubmit = async (file) => {
    const formData = new FormData();
    formData.append("pdf_file", file);

    try {
      setLoading(true); // Set loading to true before making the API request

      const response = await fetch("http://127.0.0.1:5000/get_algorithm", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSummaryData(data.summary);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false); // Set loading to false after the API request is complete
    }
  };

  const handleAlgoClick = () => {
    console.log('Algo Button Clicked! Summary Data:', summaryData);
    setData(summaryData);
  };

  const handleDataUploaded = (data) => {
    setUploadedData(data);
    console.log('jsjs--', JSON.stringify(uploadedData));
  };

  return (
    <div id="explore">
      <div className="ex">
        <h2 className="ex-title">Upload Your Research Paper</h2>
        <FileUploadComponent onDataUploaded={handleDataUploaded} onFileSubmit={handleFileSubmit} />
      </div>

      <div className="summery">
        <h2 className="Summify">Summify</h2>

        {loading ? ( // Conditionally render loader
          <div className="loader" style={{ color: 'blue' }}><Spinner animation="border" /></div>
        ) : (
          uploadedData && <div className='content-sum'>{JSON.stringify(uploadedData)}</div>
        )}
      </div>

      <div className="tabbbb">
        <div className='but'>
          <Button className='buttons mt-5' onClick={handleAlgoClick}>Algo</Button>
          <Button className='buttons mt-5'>ExplainEase</Button>
          <Button className='buttons mt-5'>LimitScope</Button>
        </div>
        {data && (
          <Card>
            <Card.Body>
              <Card.Text>{data}</Card.Text>
            </Card.Body>
          </Card>
          
        )}
      </div>
    </div>
  );
};

export default Working;
