import React, { useState } from 'react'
import MiddleWareForPrintForWorkOrder from './WorkOrderForm/WorkOrderFormFill/MiddleWareForPrint'
import WorkOrderTable from './WorkOrderForm/WorkOrderTable/WorkOrderTable'

export default function WorkOrder() {

  const [activeComponent, setActiveComponent] = useState('Show Work Orders');

  const handleButtonClick = (component) => {
    setActiveComponent(component);
  };

  return (
    <div>
    <div className="title">
        <h6>WorkOrder</h6>
        <button className={`btn ${activeComponent === 'Show Work Orders' ? 'active' : ''}`} onClick={() => handleButtonClick('Show Work Orders')}>Show Work Order(s)</button>
        <button className={`btn ${activeComponent === 'Create Work Orders' ? 'active' : ''}`} onClick={() => handleButtonClick('Create Work Orders')}>Create Work Order(s)</button>
    </div>
        
    <div style={{overflow:'auto',display:'flex', justifyContent:'center', alignItems:'center'}}>
        {
         activeComponent === 'Create Work Orders'?<MiddleWareForPrintForWorkOrder/>:
         <WorkOrderTable/>
         
        }
</div>

    </div>
  )
}
