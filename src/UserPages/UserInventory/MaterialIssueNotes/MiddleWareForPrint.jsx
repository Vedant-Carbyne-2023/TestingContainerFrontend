import React, { useState } from "react";
import MaterialIssueNoteForm from "./MaterialIssueNoteForm";
import MakePdfForMaterialIssueNote from "./MakePdfForMaterialIssueNote";

const MiddleWareForPrintIssueNote = ({projectId, data}) => {
  const [receivedData, setReceivedData] = useState(null);

  const handleDataClick = (data) => {
    setReceivedData(data);
    // console.log(data)
    
  };

  return (
    <div>
      <MaterialIssueNoteForm onDataClick={(data)=>handleDataClick(data)} data={data}  />
      {receivedData && <MakePdfForMaterialIssueNote data={receivedData} />}
    </div>
  );
};

export default MiddleWareForPrintIssueNote;
