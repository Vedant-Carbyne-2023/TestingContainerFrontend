import React, { useEffect, useState } from "react";
import MakePdfForPurchaseOrder from "./MakePdfForPurchaseOrder";
import PurchaseOrderForm from "./PurchaseOrderForm";

const MiddleWareForPrintPurchaseOrder = ({vendorId,prId}) => {
  const [receivedData, setReceivedData] = useState(null);

  const handleDataClick = (data) => {
    setReceivedData(data);
    console.log(data.data.poId)
    
  };

 
  

  return (
    <div>
    <PurchaseOrderForm onDataClick={(data)=>handleDataClick(data)} prId={prId} vendorId={vendorId} />
      {receivedData && <MakePdfForPurchaseOrder data={receivedData}   />}
    </div>
  );
};

export default MiddleWareForPrintPurchaseOrder;
