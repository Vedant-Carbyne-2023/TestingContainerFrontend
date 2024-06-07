import React, { useState } from "react";
import MaterialRequisition from "./MaterialRequisition";
import MakePdfForMaterialRequisition from "./MakePdfForMaterialRequisition";
import MaterialIssueNoteForm from "./MaterialIssueNoteForm";
import MakePdfForMaterialIssueNote from "./MakePdfForMaterialIssueNote";

const MiddleWareForPrint = () => {
  const [receivedData, setReceivedData] = useState(null);

  const handleDataClick = (data) => {
    setReceivedData(data);
    // console.log(data)
    
  };

  return (
    <div>
    <MaterialIssueNoteForm onDataClick={(data)=>handleDataClick(data)}  />
      {receivedData && <MakePdfForMaterialIssueNote data={receivedData} />}
    </div>
  );
};

export default MiddleWareForPrint;
