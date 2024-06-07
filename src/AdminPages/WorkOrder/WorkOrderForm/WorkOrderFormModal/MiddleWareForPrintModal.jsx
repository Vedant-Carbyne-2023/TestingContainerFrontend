import React, { useEffect, useState } from "react";
import WorkOrderFormModal from "./WorkOrderFormModal";
import MakePdfForWorkOrder from "./MakePdfForWorkOrder";

const MiddleWareForPrintForWorkOrderModal = ({workOrder, isToggle, amend_permission, saved}) => {
  const [receivedData, setReceivedData] = useState(null);
const [toggle, setToggle] = useState('')
  const handleDataClick = (data) => {
    setReceivedData(data);
    // console.log(data)
    
  };
  useEffect(() => {
   isToggle(toggle)
  }, [toggle])
  

const [workOrderId, setWorkOrderId] = useState("")

  return (
    <div>
      <WorkOrderFormModal onDataClick={handleDataClick} workOrder={workOrder} amend_permission={amend_permission} saved={saved} />
      {receivedData && <MakePdfForWorkOrder data={receivedData.data} onSubmitted={(toggle)=>setToggle(toggle)} tableData={receivedData.tableData} toggle={receivedData.toggle}  workOrderId={(id)=>setWorkOrderId(id)}/>}
    </div>
  );
};

export default MiddleWareForPrintForWorkOrderModal;
