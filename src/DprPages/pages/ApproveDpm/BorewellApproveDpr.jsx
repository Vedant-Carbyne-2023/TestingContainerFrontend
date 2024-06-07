import moment from 'moment';
import React, { useState } from 'react';
import { api } from '../../functions/axiosDefault';
import { errorHandler } from '../../functions/errorHandle';
import Swal from 'sweetalert2';

export default function BorewellApproveDpr({ fetchedData, projectName }) {
  console.log(fetchedData.data);
  const [dpmRemarks, setDpmRemarks] = useState('')


  const handleBorewellApproveRequest = async () => {
    if(!dpmRemarks){
      alert('Dpm Remarks Necessary')
      return;
    }
    let len = fetchedData.data.length - 1;
  
    // Create an object with common properties
    let requestData = {
      projectName:projectName,
      gpName: fetchedData.data[len].gpName,
      typeOfUser:"Dpm",
      approvedBy: "Vedant As Dpr",
      status: "Approved",
      dpmRemarks: dpmRemarks,
    };
  
    // Add drillingDates if it exists in fetchedData
    if (fetchedData.data[len].drillingDates) {
      requestData.drillingDates = fetchedData.data[len].drillingDates;
    }
  
    // Add compressorDates if it exists in fetchedData
    if (fetchedData.data[len].compressorDates) {
      requestData.compressorDates = fetchedData.data[len].compressorDates;
    }
  
    // Add opUnitDates if it exists in fetchedData
    if (fetchedData.data[len].opUnitDates) {
      requestData.opUnitDates = fetchedData.data[len].opUnitDates;
    }
  
    // Add loweringDate if it exists in fetchedData
    if (fetchedData.data[len].loweringDate) {
      requestData.loweringDate = fetchedData.data[len].loweringDate;
    }
  
    // Add gravellingDate if it exists in fetchedData
    if (fetchedData.data[len].gravellingDate) {
      requestData.gravellingDate = fetchedData.data[len].gravellingDate;
    }
  
    // Make the API request with the dynamically created object
    let result = await api.post('/borewellDailyDpr', requestData);
    result = await errorHandler(result);
  
    Swal.fire({
      title: result.data.message,
      timer: 3000,
      icon: 'success',
    });
  };
  

  return (
    <div>
      {fetchedData && (
        <table className="table table-bordered" style={{ width: '100%' }}>
        <thead className="thead-dark">
            <tr>
              <th>Dpr Date</th>
              <th>Type Of User</th>
              <th>Drilling</th>
              <th>Drilling Depth</th>
              <th>Lowering</th>
              <th>Lowering Depth</th>
              <th>Gravelling</th>
              <th>Gravel Packaging Qty</th>
              <th colSpan="3">Compressor Unit</th>
              <th colSpan="3">Op Unit</th>
              <th>Remarks</th>
              {/* <th>Labour Count</th> */}
              <th>Status</th>
              <th>Dpm Remarks</th>
            </tr>
            <tr>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th></th>
              <th>Status</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th>Status</th>
              <th>Start Time</th>
              <th>End Time</th>
              <th></th>
              <th></th>
              <th></th>
            </tr>
          </thead>
          <tbody>
            {fetchedData.data.map((dpr, index) => (
              <tr key={index} style={{ borderBottom: '1px solid #ddd' }}>
                <td>{moment(dpr.todaysDate?dpr.todaysDate:'').format('DD-MM-YYYY')}</td>
                <td>{dpr.typeOfUser ? dpr.typeOfUser : "Employee"}</td>
                <td>{dpr.drillingDates && dpr.drillingDates[dpr.drillingDates.length-1].typeOfDate == 'Start Date'?
                "Started":dpr.drillingDates[dpr.drillingDates.length-1].typeOfDate == 'End Date'?
                "Completed":"Running"
                
                }</td>
               
                <td>{dpr.drillingDepth?dpr.drillingDepth:"-"}</td>
                <td>{dpr.loweringDate?"Completed":"-"}</td>
                <td>{dpr.loweringDepth?dpr.loweringDepth:"-"}</td>
                <td>{dpr.gravellingDate?"Completed":"-"}</td>
                <td>{dpr.gravelPackagingQty?dpr.gravelPackagingQty:"-"}</td>



                <td colSpan="3">
                  <table style={{ width: '100%' }}>
                    <tbody>
                      {dpr.compressorDates.map((dates, diaIndex) => (
                        <tr key={diaIndex}>
                          <td>{dates.typeOfDate && dates.typeOfDate == 'Start Date'?
                "Started":dates.typeOfDate == 'End Date'?
                "Completed":"Running"}</td>
                          <td>{dates.timeGap &&  dates.timeGap.map(time =>
                            <div>{moment(time.startTime).format('h:mm A')}</div>
                            )}</td>
                     <td>{dates.timeGap &&  dates.timeGap.map(time =>
                            <div>{moment(time.endTime).format('h:mm A')}</div>
                            )}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td colSpan="3">
                  <table style={{ width: '100%' }}>
                    <tbody>
                      {dpr.opUnitDates.map((dates, diaIndex) => (
                        <tr key={diaIndex}>
                          <td>{dates.typeOfDate && dates.typeOfDate == 'Start Date'?
                "Started":dates.typeOfDate == 'End Date'?
                "Completed":"Running"}</td>
                          <td>{dates.timeGap &&  dates.timeGap.map(time =>
                            <div>{moment(time.startTime).format('h:mm A')}</div>
                            )}</td>
                     <td>{dates.timeGap &&  dates.timeGap.map(time =>
                            <div>{moment(time.endTime).format('h:mm A')}</div>
                            )}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </td>
                <td>{dpr.remarks}</td>
                <td>{dpr.status}</td>
                <td>{dpr.dpmRemarks}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}

                    <label>Dpm Remarks</label>
      <input className='form-control' required value={dpmRemarks} onChange={(e)=>setDpmRemarks(e.target.value)} name='dprRemarks'/>
      <button className='btn btn-primary' onClick={()=>handleBorewellApproveRequest()}> Approve Dpr </button>
    </div>
  );
}
