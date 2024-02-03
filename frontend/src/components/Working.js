import React , { useState }from 'react'
import FileUploadComponent from './FileUploadComponent'
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';

const Working = () => {
  const [uploadedData, setUploadedData] = useState(null);
  const handleDataUploaded = (data) => {
    setUploadedData(data);
  };
  return (
    <div id="explore">
      {" "}
      <div className="ex">
        <h2 className="ex-title">Upload Your Research Paper</h2>
        <FileUploadComponent onDataUploaded={handleDataUploaded} />
      </div>
      
      <div className="summery">
        <h2
          className="
Summify"
        >
          Summify
        </h2>
       

        {uploadedData && (
          <div className='content-sum'>{JSON.stringify(uploadedData)}</div>
        )}
        {/* <div className="content-sum"></div>{" "} */}
      </div>
      <div className="tabbbb">
        <Tabs
          defaultActiveKey="ConfScore"
          id="uncontrolled-tab-example"
          className="mb-3 ta"
        >
          <Tab eventKey="ConfScore" title="ConfScore">
            ConfScore evaluates the significance of a research paper by scoring
            it based on the conferences to which it has been submitted, helping
            researchers gauge the paper's potential impact.
          </Tab>
          <Tab eventKey="ExplainEase" title="ExplainEase">
            ExplainEase generates simplified explanations of complex algorithms,
            processes, or methodologies from research papers, making the content
            more accessible to a broader audience with varying levels of
            expertise.
          </Tab>
          <Tab eventKey="LimitScope" title="LimitScope">
            LimitScope identifies and analyzes the limitations present in
            research papers, offering insights into areas where further
            investigation or improvement may be needed.
          </Tab>
        </Tabs>
      </div>
    </div>
  );
}

export default Working