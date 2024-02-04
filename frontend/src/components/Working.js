import React, { useState, useEffect } from 'react';
import FileUploadComponent from './FileUploadComponent';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Spinner from 'react-bootstrap/Spinner';
import CloudDownloadIcon from '@mui/icons-material/CloudDownload';


const Working = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const [summaryData, setSummaryData] = useState(null);
  const [data, setData] = useState(null);
  const [confScore, setConfScore] = useState(null);
  const [limitation, setLimitation] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleFileSubmit = async (file) => {
    const formData = new FormData();
    formData.append("pdf_file", file);

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:5000/get_algorithm", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setSummaryData(data.summary);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleConfScoreSubmit = async (file) => {
    const formData = new FormData();
    formData.append("file", file);

    try {
      setLoading(true);

      const response = await fetch("http://127.0.0.1:5000/analyze", {
        method: "POST",
        body: formData,
      });

      const data = await response.json();
      setConfScore(data.data);
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleLimationSubmit = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
  
    try {
      setLoading(true);
  
      const response = await fetch("http://127.0.0.1:5000/limitation", {
        method: "POST",
        body: formData,
      });
  
      const data = await response.json();
      
      if (data.status === 'OK') {
        setLimitation(data.has_drawbacks);
        if (data.has_drawbacks) {
          console.log("Limitation is present in the dataset.");
          setLimitation("Limitation is present in the research paper.")
        } else {
          console.log("No limitation included in the research paper.");
          setLimitation("No Limitation is present in the research paper.")
        }
      } else {
        console.error("Error:", data.error);
      }
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoading(false);
    }
  };
  

  const handleAlgoClick = () => {
    console.log('Algo Button Clicked! Summary Data:', summaryData);
    setData(summaryData);
  };

  const handleLimationClick = () => {
    console.log('Limitations Button Clicked! Limitations Data:', limitation);
    setData(limitation);
  };

  const handleConfScoreClick = () => {
    console.log('ConfScore Button Clicked! ConfScore Data:', confScore);
    setData(confScore);
  };

  const handleDataUploaded = (data) => {
    setUploadedData(data);
    console.log('jsjs--', JSON.stringify(uploadedData));
  };

  const handleDownload = () => {
    // Assuming `data` contains the summary text
    const blob = new Blob([uploadedData], { type: 'text/plain' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(blob);
    link.download = 'summary.txt';
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div id="explore">
      <div className="ex">
        <h2 className="ex-title">Upload Your Research Paper</h2>
        <FileUploadComponent
          onDataUploaded={handleDataUploaded}
          onFileSubmit={handleFileSubmit}
          onScoreSubmit={handleConfScoreSubmit}
          onLimitationSubmit={handleLimationSubmit}
        />
      </div>

      <div className="summery">
        <h2 className="Summify">Summify</h2>

        {loading ? (
          <div className="loader" style={{ color: 'blue' }}>
            <Spinner animation="border" />
          </div>
        ) : (
          uploadedData && <div className="content-sum">{JSON.stringify(uploadedData)}</div>
        )}

       
      </div>
      {uploadedData && (
         <div className='do'>
          Download the Summary &nbsp; &nbsp;
           <Button className="buttons mt-3" onClick={handleDownload}>
         <CloudDownloadIcon/>
        </Button>
          </div>
        )}
      <div className="tabbbb">
        <div className="but">
          <Button className="buttons mt-5" onClick={handleAlgoClick}>
            ExplainEase
          </Button>
          <Button className="buttons mt-5" onClick={handleConfScoreClick}>
            ConfScore
          </Button>
          <Button className="buttons mt-5" onClick={handleLimationClick}>
            LimitScope
          </Button>
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
