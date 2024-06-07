import React, { useEffect, useState } from "react";
import MaterialRequisition from "./MaterialRequisition";
import MakePdfForMaterialRequisition from "./MakePdfForMaterialRequisition";

const MiddleWareForPrint = ({setSubmit, OnClose}) => {
  const [receivedData, setReceivedData] = useState(null);
  const [status, setStatus] = useState(false)

  useEffect(() => {
    setSubmit(status)
  }, [status])
  

  const handleDataClick = (data) => {
    setReceivedData(data);
    console.log(data)
    
  };



  return (
    <div>
      <MaterialRequisition OnClose={OnClose} setStatus={(status)=>setSubmit(status)} onDataClick={handleDataClick} />
      {receivedData && <MakePdfForMaterialRequisition data={receivedData} />}
    </div>
  );
};

export default MiddleWareForPrint;
