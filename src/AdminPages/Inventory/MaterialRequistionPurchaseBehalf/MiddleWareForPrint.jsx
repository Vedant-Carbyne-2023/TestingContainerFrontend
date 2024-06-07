import React, { useState } from "react";
import MaterialRequisition from "./MaterialRequisition";
import MakePdfForMaterialRequisition from "./MakePdfForMaterialRequisition";

const MiddleWareForPrint = () => {
  const [receivedData, setReceivedData] = useState(null);

  const handleDataClick = (data) => {
    setReceivedData(data);
    // console.log(data)
    
  };

  return (
    <div>
      <MaterialRequisition onDataClick={handleDataClick} />
      {receivedData && <MakePdfForMaterialRequisition data={receivedData} />}
    </div>
  );
};

export default MiddleWareForPrint;
