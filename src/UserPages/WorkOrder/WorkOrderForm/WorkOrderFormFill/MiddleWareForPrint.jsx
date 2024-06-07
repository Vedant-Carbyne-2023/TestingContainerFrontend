import React, { useState } from "react";
import WorkOrderForm from "./WorkOrderForm";
import MakePdfForWorkOrder from "./MakePdfForWorkOrder";

const MiddleWareForPrintForWorkOrder = () => {
  const [receivedData, setReceivedData] = useState("");
const [pdfStatus, setPdfStatus] = useState("")
  const handleDataClick = (data) => {
    setReceivedData(data);
    // console.log(data)
    
  };

const [workOrderId, setWorkOrderId] = useState("")

  return (
    <div>
      <WorkOrderForm onDataClick={handleDataClick} workOrderId={workOrderId} pdfStatus={pdfStatus} />
      {receivedData && <MakePdfForWorkOrder data={receivedData.data} tableData={receivedData.tableData} toggle={receivedData.toggle}  workOrderId={(id)=>setWorkOrderId(id)}  pdfStatus={(data)=>setPdfStatus(data)} />}
    </div>
  );
};

export default MiddleWareForPrintForWorkOrder;
